import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Header from "./Header";
import updateUserDetails from "@component/lib/updateUserDetails";
import AccountInfoSection from "./AccountInfoSection";
import SocialAccountsSection from "./SocialAccountsSection";
import AccountDataDialogs from "./AccountDataDialogs";
import ChangePasswordDialog from "./ChangePasswordDialog";
import styles from "./styles/accountDetails.module.css";
import { useUser } from "../lib/authContext";

export default function AccountDetails() {
    const { user, setUser, loading } = useUser();
    const router = useRouter();
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({});
    const [, setCookie] = useCookies(["jwt", "username", "email"]);

    const handleSave = async (e) => {
        e.preventDefault();

        if (!user) {
            console.log("User not authenticated or logged in.");
            router.push("/home");
        }

        const accessToken = user.jwt;

        const updatedUser = await updateUserDetails(
            user.id,
            formData.email,
            formData.username,
            accessToken
        );

        console.log(updatedUser);

        if (updatedUser.id == user.id) {
            setCookie("username", updatedUser.username);
            setCookie("email", updatedUser.email);
            setUser((prevUser) => {
                return { ...prevUser, ...updatedUser };
            });
        }

        toggleEditable();
    };

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (user) {
            setFormData({ ...user });
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <div className={`container ${styles.container}`}>
            <Header
                name="Account Details Page"
                handleEdit={toggleEditable}
                handleSave={handleSave}
                editMode={isEditable}
            />
            <AccountInfoSection
                isEditable={isEditable}
                formData={formData}
                handleInputChange={handleInputChange}
                loading={loading}
                user={user}
            />
            <ChangePasswordDialog user={user} styles={styles} />
            <SocialAccountsSection user={user} />
            <AccountDataDialogs />
        </div>
    );
}
