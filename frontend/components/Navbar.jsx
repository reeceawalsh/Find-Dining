import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./styles/navbar.module.css";

const logo = require("../public/LogoCropped.png");

const Navbar = () => {
    const { user, loading, logout } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/home");
    };

    return (
        <div className={`${styles.navbar} blue-background`}>
            <div className={styles.logoContainer}>
                <Image
                    className={styles.logo}
                    src={logo}
                    alt="Find Dining Logo - A very cute burger with a knife and fork."
                />
                {/* <p>Find Dining</p> */}
            </div>
            <div className="left-navbar">
                <Link className={styles.link} href="/home/about">
                    About
                </Link>
                <Link className={styles.link} href="/home/search">
                    Search
                </Link>
                <Link className={styles.link} href="/home/setlocation">
                    Set Location
                </Link>
                {user && (
                    <>
                        <Link className={styles.link} href="/home/favourites">
                            Favourites
                        </Link>
                    </>
                )}
            </div>
            <div className="right-navbar">
                {loading ? (
                    <span>Loading...</span>
                ) : user ? (
                    <>
                        <Link className={styles.link} href="/profile">
                            Profile
                        </Link>
                        <a className={styles.link} onClick={handleLogout}>
                            Logout
                        </a>
                    </>
                ) : (
                    <>
                        <Link className={styles.link} href="/login">
                            Login
                        </Link>
                        <Link className={styles.link} href="/register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
