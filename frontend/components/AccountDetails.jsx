import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Header from "./Header";
import updateUserDetails from "@component/lib/updateUserDetails";
import AccountInfoSection from "./AccountInfoSection";
import AccountDataDialogs from "./AccountDataDialogs";
import ChangePasswordDialog from "./ChangePasswordDialog";
import styles from "./styles/accountDetails.module.css";
import { useUser } from "../lib/authContext";
import validate from "../validationRules/ChangeAccountDetails";

// account details component located on the profile page
const AccountDetails = () => {
    const { user, setUser, loading } = useUser();
    const router = useRouter();
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({});
    const [cookies, setCookie] = useCookies(["jwt", "username", "email"]);
    const [accessToken, setAccessToken] = useState(user && user.jwt);
    const [errors, setErrors] = useState([]);
    const [updatedUser, setUpdatedUser] = useState({
        id: "",
        email: "",
        username: "",
        accessToken: "",
    });

    // handles pressing save
    const handleSave = async (e) => {
        e.preventDefault();

        // runs validation on the registration details
        let newErrors = checkErrors(formData);
        // if there are no errors...
        if (Object.keys(newErrors).length === 0) {
            // sends a put request to the server to update the users email and username. updating password is a separate request.
            try {
                const data = await updateUserDetails(
                    user.id,
                    formData.email,
                    formData.username,
                    cookies.jwt
                );

                if (data) {
                    setCookie("username", data.username);
                    setCookie("email", data.email);
                    setUser((prevUser) => {
                        return {
                            ...prevUser,
                            email: data.email,
                            username: data.username,
                        };
                    });
                    console.log(user);
                    toggleEditable();
                }
            } catch (error) {
                if (error.isAxiosError) {
                    console.log(error.response.data);
                } else {
                    console.log(error);
                }
            }
        } else {
            console.log("errors", newErrors);
            setErrors(newErrors);
        }
        if (!user) {
            console.log("User not authenticated or logged in.");
            router.push("/home");
        }
    };

    // checks for errors using RegistrationVR. Ensures the username and email are valid.
    const checkErrors = (data) => {
        let newErrors = validate(data);
        setErrors(newErrors);
        return newErrors;
    };

    // toggles the ability to edit fields
    const toggleEditable = () => {
        setIsEditable(!isEditable);
    };

    // tracks the fields that are being edited.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // updates the formdata when the user has changed their info with the info they changed it to.
    useEffect(() => {
        if (user) {
            setFormData({ ...user });
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <div className="profileContainer">
            <Header
                name="Account Details"
                handleEdit={toggleEditable}
                handleSave={handleSave}
                editMode={isEditable}
            />
            <p className={styles.subtitle}>
                Update your personal details and account information here.
            </p>
            <AccountInfoSection
                isEditable={isEditable}
                formData={formData}
                handleInputChange={handleInputChange}
                loading={loading}
                user={user}
                errors={errors}
            />
            <ChangePasswordDialog user={user} styles={styles} />
            <AccountDataDialogs />
        </div>
    );
};

export default AccountDetails;
