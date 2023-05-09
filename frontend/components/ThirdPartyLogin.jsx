import styles from "./styles/thirdpartylogin.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import AppleIcon from "@mui/icons-material/Apple";
import { getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

// NOT IN USE
export default function ThirdPartyLogin() {
    return (
        <div className={`container ${styles.container} peach-background`}>
            <h2>Continue with...</h2>
            <div className={styles.icons}>
                <FacebookIcon className="social-media-icon" />
                <Link href="/api/auth/signin">
                    <GoogleIcon
                        className="social-media-icon"
                        onClick={(e) => {
                            e.preventDefault();
                            signIn();
                        }}
                    />{" "}
                </Link>
                <InstagramIcon className="social-media-icon" />
                <AppleIcon className="social-media-icon" />
            </div>
        </div>
    );
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    return {
        props: {
            session,
        },
    };
};
