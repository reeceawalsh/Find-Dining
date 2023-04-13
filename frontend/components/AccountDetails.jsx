import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Header from "@component/components/Header";
import HeaderWithSave from "@component/components/HeaderWithSave";
import { useFormControl } from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SocialLinkItem from "./SocialLinkItem";
import styles from "./styles/accountDetails.module.css";
import TextInput from "./FormElements/TextInput";
import TextInputLabel from "./FormElements/TextInputLabel";

// Account Details Page
export default function AccountDetails({ user }) {
    const [openSavedData, setOpenSavedData] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [connected, setConnected] = useState([]);
    const [isEditable, setIsEditable] = useState({
        username: false,
        email: false,
    });
    const theme = useTheme();
    const [localUser, setLocalUser] = useState({ ...user });

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
        toggleEditable(field);
    };

    const toggleEditable = (field) => {
        setIsEditable({ ...isEditable, [field]: !isEditable[field] });
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalUser({ ...localUser, [name]: value });
    };

    return (
        <div className="container">
            <HeaderWithSave name="Account Details Page" />
            <div className="info-section-container">
                <div className="info-section-item">
                    <p>Username:</p>
                    <TextInput
                        name="username"
                        value={localUser.username}
                        onChange={handleInputChange}
                        className={styles.inputbox}
                        editable={isEditable.username}
                        onToggleEditable={() => {
                            if (isEditable.username) {
                                handleSave("username");
                            } else {
                                toggleEditable("username");
                            }
                        }}
                        hasEditButton={true}
                    />
                    <TextInput
                        name="email"
                        value={localUser.email}
                        onChange={handleInputChange}
                        className={styles.inputbox}
                        editable={isEditable.email}
                        onToggleEditable={() => {
                            if (isEditable.email) {
                                handleSave("email");
                            } else {
                                toggleEditable("email");
                            }
                        }}
                        hasEditButton={true}
                    />
                </div>

                <div className="info-section-item">
                    <Button variant="outlined">Change Password</Button>
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
        </div>
    );
}
