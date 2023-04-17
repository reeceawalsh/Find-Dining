import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./styles/navbar.module.css";
import NavLink from "./NavLink";

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
                <Link href="/home">
                    <Image
                        className={styles.logo}
                        src={logo}
                        alt="Find Dining Logo - A very cute burger with a knife and fork."
                    />
                </Link>
            </div>
            <div className="left-navbar">
                <NavLink className={styles.link} href="/home">
                    Home
                </NavLink>
                <NavLink className={styles.link} href="/home/about">
                    About
                </NavLink>
                <NavLink className={styles.link} href="/home/search">
                    Search
                </NavLink>
                <NavLink className={styles.link} href="/home/setlocation">
                    Set Location
                </NavLink>
                {user && (
                    <NavLink className={styles.link} href="/home/favourites">
                        Favourites
                    </NavLink>
                )}
            </div>
            <div className={styles.rightNavbar}>
                {loading ? (
                    <span>Loading...</span>
                ) : user ? (
                    <>
                        <p className={styles.username}>
                            Signed in as:
                            <span>
                                {" "}
                                {!loading ? user.username : "Loading..."}{" "}
                            </span>
                        </p>
                        <div className={styles.rightNavbarLinks}>
                            <NavLink className={styles.link} href="/profile">
                                Profile
                            </NavLink>
                            <NavLink
                                className={styles.link}
                                href="/home"
                                onClick={handleLogout}
                            >
                                Logout
                            </NavLink>
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink className={styles.link} href="/login">
                            Login
                        </NavLink>
                        <NavLink className={styles.link} href="/register">
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
