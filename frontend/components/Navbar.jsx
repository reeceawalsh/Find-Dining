import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import Image from "next/image";
import styles from "./styles/navbar.module.css";
import NavLink from "./NavLink";

const logo = require("../public/HeaderLogo.jpg");
const userIcon = require("../public/OrangeUserIcon.svg");

const Navbar = () => {
    const { user, loading, logout, setUser } = useUser();
    const handleLogout = () => {
        logout();
    };

    return (
        //CHANGE THIS BACK TO BLUE BACKGROUND
        <div className="headerContainer">
        <div className={`${styles.navbar} white-background`}> 
            <div className={styles.logoContainer}>
                <Link href="/home">
                    <Image
                        className={styles.logo}
                        src={logo}
                        alt="Find Dining Logo - A very cute burger with a knife and fork."
                        priority="true"
                    />
                </Link>
                <div className={styles.logoName}><span>Find </span><span>Dining</span></div>
            </div>
            <div className={styles.rightNavbar}>
                {loading ? (
                    <span>Loading...</span>
                ) : user ? (
                    <>     
                        <div className={styles.profileBox}>        
                                <span>
                                    {" "}
                                    {!loading ? user.username : "Loading..."}{" "}
                                </span>
                            <Image
                                className={styles.userIcon}
                                src={userIcon}
                                alt="User Icon"
                            />
                        </div> 
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
            <div className={styles.leftNavbarLinks}>
            <NavLink className={styles.link} href="/home">
                Home
            </NavLink>
            <NavLink className={styles.link} href="/home/about">
                About
            </NavLink>

            {user && (
                <>
                    <NavLink
                        className={styles.link}
                        href="/home/favourites"
                    >
                        Favourites
                    </NavLink>
                    <NavLink className={styles.link} href="/restaurants">
                        Find Dining
                    </NavLink>
                </>
            )}
        </div>
       </div>
    );
};

export default Navbar;
