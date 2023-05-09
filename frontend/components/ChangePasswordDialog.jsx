import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ChangePasswordForm from "./Forms/ChangePasswordForm";
import Button from "@mui/material/Button";
import validate from "@component/validationRules/ChangePasswordVR";
import changePassword from "@component/lib/changePassword";
import { useState } from "react";

// this component is accessed through the account details page and will open when the user presses the 'change password' button.
const ChangePasswordDialog = ({ user, styles }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [openDialog, setOpenDialog] = useState(false);
    // three passwords must be sent to the backend in order to set a new password
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState([]);
    const [invalidPassword, setInvalidPassword] = useState(false);

    // opens and closes the dialog
    const toggleDialog = () => {
        wipePasswordData();
        setOpenDialog(!openDialog);
    };

    // handles changing the users password (TODO)
    const handleChangePassword = (e) => {
        // check that passwords match
        e.preventDefault();
        // runs validation on the new password
        let newErrors = checkErrors(passwordData);
        console.log(newErrors);
        // if there are no errors...
        if (Object.keys(newErrors).length === 0) {
            // TODO - if (passwordData.password === user password)
            const accessToken = user.jwt;
            changePassword(
                passwordData.password,
                passwordData.newPassword,
                passwordData.confirmPassword,
                accessToken
            );
            toggleDialog();
        } else {
            console.log("errors", newErrors);
            setErrors(newErrors);
            setInvalidPassword(true);
        }
    };

    // checks for errors with the data, the logic is visible in the ChangePasswordVR in the validationRules folder
    const checkErrors = (data) => {
        let newErrors = validate(data);
        setErrors(newErrors);
        return newErrors;
    };

    // wipes the form clean
    const wipePasswordData = () => {
        const newPasswordData = {
            password: "",
            newPassword: "",
            confirmPassword: "",
        };
        setPasswordData(newPasswordData);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div className="info-section-container">
                <Button variant="outlined" onClick={toggleDialog}>
                    Change Password
                </Button>
            </div>
            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                onClose={toggleDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent
                    style={{
                        padding: theme.spacing(5),
                    }}
                >
                    <ChangePasswordForm
                        setPasswordData={setPasswordData}
                        passwordData={passwordData}
                        errors={errors}
                        handleChangePassword={handleChangePassword}
                        toggleDialog={toggleDialog}
                        styles={styles}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChangePasswordDialog;
