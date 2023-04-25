import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import deleteAccount from "@component/lib/deleteAccount";
import { useUser } from "@component/lib/authContext";
import { checkPassword } from "@component/lib/checkPassword";

const AccountDataDialogs = () => {
  const { user, logout } = useUser();
  const [openSavedData, setOpenSavedData] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleToggleSavedDataModal = () => {
    setOpenSavedData(!openSavedData);
  };

  const handleToggleAccountModal = () => {
    setOpenAccount(!openAccount);
  };

  const handleDeleteAllSavedData = (e) => {
    e.preventDefault();
    handleToggleSavedDataModal();
    console.log("Deleting all saved data");
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const isPasswordCorrect = await checkPassword(user.email, password);
    if (isPasswordCorrect) {
      handleToggleAccountModal();
      const accessToken = user.jwt;
      deleteAccount(user.id, accessToken, logout);
      console.log("Deleting account");
    } else {
      alert("Incorrect password. Please try again.");
    }
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
          <Button
            autoFocus
            onClick={(e) => {
              handleDeleteAllSavedData(e);
            }}
          >
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
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(e) => {
                handleDeleteAccount(e);
              }}
            >
              Yes
            </Button>
            <Button onClick={handleToggleAccountModal} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default AccountDataDialogs;
  