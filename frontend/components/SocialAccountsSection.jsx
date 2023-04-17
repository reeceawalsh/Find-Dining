import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import SocialLinkItem from "./SocialLinkItem";

export default function SocialAccountsSection({ user, styles }) {
    return (
        <div className="container">
            <div className="info-section-container">
                <div className="info-section-item">
                    <h2 style={{ paddingLeft: "1rem" }}>Social Accounts</h2>
                </div>
            </div>
            <div className="info-section-container">
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
        </div>
    );
}
