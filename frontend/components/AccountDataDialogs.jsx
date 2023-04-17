import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function AccountDataDialogs() {
    const [openSavedData, setOpenSavedData] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleToggleSavedDataModal = () => {
        setOpenSavedData(!openSavedData);
    };

    const handleToggleAccountModal = () => {
        setOpenAccount(!openAccount);
    };

    return (
        <div className="container">
            <div className="info-section-container">
                <Button variant="outlined" onClick={handleToggleSavedDataModal}>
                    Delete all saved data
                </Button>
                <Button variant="outlined" onClick={handleToggleAccountModal}>
                    Delete account
                </Button>
            </div>

            {/* Saved Data Dialog */}
            <Dialog
                fullScreen={fullScreen}
                open={openSavedData}
                onClose={handleToggleSavedDataModal}
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
                    <Button autoFocus onClick={handleToggleSavedDataModal}>
                        Yes
                    </Button>
                    <Button onClick={handleToggleSavedDataModal} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Account Deletion Dialog */}
            <Dialog
                fullScreen={fullScreen}
                open={openAccount}
                onClose={handleToggleAccountModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your account?
                        <br></br>It is unrecoverable.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleToggleAccountModal}>
                        Yes
                    </Button>
                    <Button onClick={handleToggleAccountModal} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
