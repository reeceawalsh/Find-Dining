import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ChangePasswordForm from "./Forms/ChangePasswordForm";
import Button from "@mui/material/Button";
import validate from "@component/validationRules/ChangePasswordVR";
import changePassword from "@component/lib/changePassword";

import { useState } from "react";

export default function ChangePasswordDialog({ user, styles }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [openDialog, setOpenDialog] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState(validate(passwordData));

    const toggleDialog = () => {
        wipePasswordData();
        setOpenDialog(!openDialog);
    };

    const handleChangePassword = (e) => {
        // check that passwords match
        e.preventDefault();
        // runs validation on the new password
        let newErrors = checkErrors(passwordData);

        // if there are no errors...
        if (Object.keys(newErrors).length === 0) {
            // if (passwordData.password === user password)
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

    return (
        <div className="container">
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
                <DialogContent>
                    <ChangePasswordForm
                        setPasswordData={setPasswordData}
                        passwordData={passwordData}
                        errors={errors}
                        handleChangePassword={handleChangePassword}
                        styles={styles}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
