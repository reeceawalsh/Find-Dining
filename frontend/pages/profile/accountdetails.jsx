import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Header from "@component/components/Header";
import HeaderWithSave from "@component/components/HeaderWithSave";
import { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

// Account Details Page
export default function AccountDetails() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="container">
            <HeaderWithSave name="Account Details Page" />
            <div className="info-section-container">
                <div className="info-section-item"><TextField fullWidth id="filled-basic" label="Name" variant="filled" /></div>
                <div className="info-section-item"><TextField fullWidth id="filled-basic" label="City" variant="filled" /></div>
            </div>
            <div className="info-section-container">
                <div className="info-section-item">
                    <h2 style={{ paddingLeft: '1rem' }}>Social Accounts</h2>
                </div>
            </div>
            <div className="info-section-container">
                <div><FacebookIcon className="social-media-icon" />Facebook</div>
                <div><InstagramIcon className="social-media-icon" />Instagram</div>
                <div><GoogleIcon className="social-media-icon" />Google</div>
            </div>
            <div className="info-section-container">
                <div>Find Dining will never post your account without your express permission.</div>
                <br></br>
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Delete all saved data
                    </Button>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete all your saved data?
                                <br></br>(This will include your history and achievements)
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Yes
                            </Button>
                            <Button onClick={handleClose} autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <br></br>
                <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                        Delete account
                    </Button>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete all your saved data?
                                <br></br>(This will include your history and achievements)
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Yes
                            </Button>
                            <Button onClick={handleClose} autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
