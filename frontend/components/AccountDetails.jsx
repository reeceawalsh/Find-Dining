import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import HeaderWithSave from "@component/components/HeaderWithSave";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SocialLinkItem from "./SocialLinkItem";
import styles from "./styles/accountDetails.module.css";
import TextInput from "./FormElements/TextInput";
import PasswordInput from "./FormElements/PasswordInput";
import ProfileTextInput from "./FormElements/ProfileTextInput";
import ChangePassword from "./Forms/ChangePasswordForm";
import validate from "../validationRules/ChangePasswordVR";

// Account Details Page
export default function AccountDetails({ user }) {
    const [openSavedData, setOpenSavedData] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [connected, setConnected] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const theme = useTheme();
    const [localUser, setLocalUser] = useState({ ...user });
    const [passwordData, setPasswordData] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState([]);

    console.log(user);

    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickConnected = (name) => {
        if (!checkConnected(name)) {
            const newConnected = [...connected, name];
            setConnected(newConnected);
        }

        // replace with put request to server
    };

    const checkConnected = (name) => {
        let found = false;
        connected.map((item) => {
            if (item == name) {
                found = true;
            }
        });

        return found;
    };

    const handleSave = (field) => {
        // Send updates to the backend, for example:
        // updateUserField(user.id, field, localUser[field]);

        // Once the backend updates are successful, update the cookie:
        // updateCookie("user", { ...user, [field]: localUser[field] });

        // Toggle off the editable state
        toggleEditable();
    };

    const handleChangePassword = (e) => {
        // check that passwords match
        e.preventDefault();
        // runs validation on the new password
        let newErrors = checkErrors(passwordData);

        // if there are no errors...
        if (Object.keys(newErrors).length === 0) {
            // if (passwordData.password === user password)
            console.log("Changing password to " + passwordData.newPassword);
        } else {
            console.log("errors", newErrors);
            setErrors(newErrors);
        }
    };

    const checkErrors = (data) => {
        let newErrors = validate(data);
        setErrors(newErrors);
        return newErrors;
    };

    const wipePasswordData = () => {
        const newPasswordData = {
            password: "",
            newPassword: "",
            confirmPassword: "",
        };
        setPasswordData(newPasswordData);
    };

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    };
    const handleClickOpenSavedData = () => {
        setOpenSavedData(true);
    };

    const handleClickOpenAccount = () => {
        setOpenAccount(true);
    };

    const handleCloseSavedData = () => {
        setOpenSavedData(false);
    };

    const handleCloseAccount = () => {
        setOpenAccount(false);
    };

    const handleCloseChangePassword = () => {
        setOpenChangePassword(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalUser({ ...localUser, [name]: value });
    };

    return (
        <div className="container">
            <HeaderWithSave
                name="Account Details Page"
                handleEdit={toggleEditable}
                handleSave={handleSave}
                editMode={isEditable}
            />
            <div className="info-section-container">
                <div className="info-section-item">
                    <p>Username:</p>
                    <ProfileTextInput
                        name="username"
                        value={localUser.username}
                        onChange={handleInputChange}
                        additionalClass={!isEditable ? styles.pointer : ""}
                        editable={isEditable}
                    />
                </div>
                <div className="info-section-item">
                    <p>Email:</p>
                    <ProfileTextInput
                        name="email"
                        value={localUser.email}
                        onChange={handleInputChange}
                        additionalClass={!isEditable ? styles.pointer : ""}
                        editable={isEditable}
                    />
                </div>

                <div className="info-section-item">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            wipePasswordData();
                            setOpenChangePassword(true);
                        }}
                    >
                        Change Password
                    </Button>
                </div>
            </div>
            <div className="info-section-container">
                <div className="info-section-item">
                    <h2 style={{ paddingLeft: "1rem" }}>Social Accounts</h2>
                </div>
            </div>
            <div
                className={`info-section-container ${styles.social_links_section}`}
            >
                <SocialLinkItem
                    icon={<FacebookIcon />}
                    name="Facebook"
                    checkConnected={user.FacebookLinked}
                    handleClickConnected={() =>
                        handleClickConnected("Facebook")
                    }
                />
                <SocialLinkItem
                    icon={<InstagramIcon />}
                    name="Instagram"
                    checkConnected={user.InstagramLinked}
                    handleClickConnected={() =>
                        handleClickConnected("Instagram")
                    }
                />
                <SocialLinkItem
                    icon={<GoogleIcon />}
                    name="Google"
                    checkConnected={user.GoogleLinked}
                    handleClickConnected={() => handleClickConnected("Google")}
                />
            </div>
            <div className="info-section-container padding-left">
                <div>
                    <p>
                        Find Dining will never post without your express
                        permission.
                    </p>
                </div>
                <div className={styles.buttons}>
                    <Button
                        variant="outlined"
                        onClick={handleClickOpenSavedData}
                    >
                        Delete all saved data
                    </Button>
                    <Button variant="outlined" onClick={handleClickOpenAccount}>
                        Delete account
                    </Button>
                </div>
                <Dialog
                    fullScreen={fullScreen}
                    open={openSavedData}
                    onClose={handleCloseSavedData}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete all your saved data?
                            <br></br>(This will include your history and
                            achievements)
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseSavedData}>
                            Yes
                        </Button>
                        <Button onClick={handleCloseSavedData} autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <br></br>
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={openAccount}
                    onClose={handleCloseAccount}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete your account?
                            <br></br>It is unrecoverable.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseAccount}>
                            Yes
                        </Button>
                        <Button onClick={handleCloseAccount} autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={openChangePassword}
                    onClose={handleCloseChangePassword}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <div>
                            <ChangePassword
                                styles={styles}
                                setPasswordData={setPasswordData}
                                passwordData={passwordData}
                                errors={errors}
                                handleChangePassword={handleChangePassword}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
