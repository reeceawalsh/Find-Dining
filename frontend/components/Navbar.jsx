import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import Image from "next/image";
import styles from "./styles/navbar.module.css";
import NavLink from "./NavLink";
import { useContext, useState, useEffect } from "react";
import Location from "@component/lib/locationContext";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import fetchPostCode from "@component/lib/fetchPostCode";

const logo = require("../public/HeaderLogo.jpg");
const userIcon = require("../public/OrangeUserIcon.svg");

const Navbar = () => {
    const { user, loading, logout } = useUser();
    // geoLocation is the users current location, location is the location that the user is currently searching around for restaurants.
    const { geoLocation, location, setLocation } = useContext(Location);
    const [postCode, setPostCode] = useState(null);
    const [geoLocationPostCode, setGeoLocationPostCode] = useState(null);
    const router = useRouter();

    // handles logging out
    const handleLogout = () => {
        logout();
    };

    // will use the users actual location if they're on the home page and their searched for location if they're not.
    const handleSearch = () => {
        if (router.pathname === "/home") {
            setLocation(geoLocation);
            router.push("/restaurants");
        }
    };

    // we want to display the post code of the users geo location if they're on the home page and their searched location, if they have one, if they're not on the home page. it will also just display no post code if neither is available.
    const displayPostCode = () => {
        if (router.pathname === "/home") {
            return geoLocationPostCode || "";
        } else {
            return postCode || "";
        }
    };

    // this useEffect will run when a currentLocation or a searchedLocation is updated, as when it runs on mount neither of these will be defined. this function retrieves both post codes from both locations and sets them in state.
    useEffect(() => {
        if (location) {
            fetchPostCode(location)
                .then((postCode) => setPostCode(postCode))
                .catch((error) =>
                    console.error("Error fetching postcode:", error)
                );
        }
        if (geoLocation) {
            fetchPostCode(geoLocation)
                .then((postCode) => setGeoLocationPostCode(postCode))
                .catch((error) =>
                    console.error("Error fetching postcode:", error)
                );
        }
    }, [location, geoLocation]);

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
<<<<<<< HEAD
                <div className={styles.logoName}><span>Find </span><span>Dining</span></div>
=======
                <button
                    className={styles.postalCodeButton}
                    onClick={handleSearch}
                >
                    <div className={styles.pinWrapper}>
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className={styles.locationPin}
                        />
                    </div>
                    <Link href="/restaurants">
                        <span className={styles.postalCode}>
                            {displayPostCode() || ""}
                        </span>
                    </Link>
                </button>
            </div>
            <div className="left-navbar">
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
                        {location && (
                            <NavLink
                                className={styles.link}
                                href="/restaurants"
                            >
                                Find Dining
                            </NavLink>
                        )}
                    </>
                )}
>>>>>>> main
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
