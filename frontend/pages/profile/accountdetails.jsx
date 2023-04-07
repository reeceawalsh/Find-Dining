import Header from "@component/components/Header";
import HeaderWithSave from "@component/components/HeaderWithSave";
import { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

// Account Details Page
export default function AccountDetails() {
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
                <div>Delete all saved data.</div>
                <div>Delete account</div>
            </div>
        </div>
    );
}
