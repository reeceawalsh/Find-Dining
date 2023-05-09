import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import SocialLinkItem from "./SocialLinkItem";
import { useState, useEffect } from "react";

// NOT IN USE
export default function SocialAccountsSection({ user }) {
    const [connected, setConnected] = useState({});

    const handleClickConnected = (name) => {
        let successful = false;
        // add ability to link a social media account and try to do so, if it's successful then continue.
        if (successful) {
            setConnected((prevState) => {
                return {
                    ...prevState,
                    [name.toLowerCase()]: !prevState[name.toLowerCase()],
                };
            });
        }
    };

    // will check if the user is connected on the backend and update the local state accordingly.
    useEffect(() => {
        if (user) {
            setConnected({
                facebook: user.FacebookLinked,
                instagram: user.InstagramLinked,
                twitter: user.twitterLinked,
            });
        }
    }, [user]);

    return (
        <div className="container">
            <div className="info-section-container">
                <div className="info-section-item">
                    <h2 className="info-section-title">Social Accounts</h2>
                </div>
            </div>
            <div className="info-section-container">
                <SocialLinkItem
                    icon={<FacebookIcon />}
                    name="Facebook"
                    checkConnected={connected["facebook"]}
                    handleClickConnected={() =>
                        handleClickConnected("Facebook")
                    }
                />
                <SocialLinkItem
                    icon={<InstagramIcon />}
                    name="Instagram"
                    checkConnected={connected["instagram"]}
                    handleClickConnected={() =>
                        handleClickConnected("Instagram")
                    }
                />
                <SocialLinkItem
                    icon={<GoogleIcon />}
                    name="Google"
                    checkConnected={connected["google"]}
                    handleClickConnected={() => handleClickConnected("Google")}
                />
            </div>
        </div>
    );
}
