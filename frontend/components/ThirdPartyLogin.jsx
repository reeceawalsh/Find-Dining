import styles from "./styles/thirdpartylogin.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import AppleIcon from "@mui/icons-material/Apple";

export default function ThirdPartyLogin() {
    return (
        <div className={`container ${styles.container} peach-background`}>
            <h2>Continue with...</h2>
            <div className={styles.icons}>
                <FacebookIcon className="social-media-icon" />
                <GoogleIcon className="social-media-icon" />
                <InstagramIcon className="social-media-icon" />
                <AppleIcon className="social-media-icon" />
            </div>
        </div>
    );
}
