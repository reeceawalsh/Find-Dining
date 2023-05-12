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

const logo = require("../public/LogoCropped.png");
const userIcon = require("../public/OrangeUserIcon.svg");

const Navbar = ({ page }) => {
    const { user, loading, logout } = useUser();
    const [showDropdown, setShowDropdown] = useState(false);
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
            console.log(geoLocationPostCode);
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
                    <Link href="/home">
                        <div className={styles.title}>
                            <span className="white-font">Find</span>{" "}
                            <span className="white-font">Dining</span>
                        </div>
                    </Link>
                    {location && (
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
                    )}
                </div>
                <div className={styles.leftNavbar}>
                    <NavLink className={styles.link} href="/home">
                        Home
                    </NavLink>

                    {user && (
                        <>
                            <NavLink
                                className={styles.link}
                                href="/home/favourites"
                            >
                                Favourites
                            </NavLink>
                            <NavLink
                                className={styles.link}
                                href="/home/visited"
                            >
                                Visited
                            </NavLink>
                            {location && (
                                <NavLink
                                    className={styles.link}
                                    href="/restaurants"
                                >
                                    Nearby Restaurants
                                </NavLink>
                            )}
                        </>
                    )}
                </div>
                <div className={styles.rightNavbar}>
                    {loading ? (
                        <span>Loading...</span>
                    ) : user ? (
                        <>
                            <div
                                className={`${styles.profileBox} ${
                                    showDropdown
                                        ? styles.profileBoxDropdownOpen
                                        : ""
                                }`}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                <NavLink
                                    className={`${styles.link} ${styles.profileLink}`}
                                    href="/profile"
                                >
                                    <span>
                                        {" "}
                                        {!loading
                                            ? user.username
                                            : "Loading..."}{" "}
                                    </span>
                                    <Image
                                        className={styles.userIcon}
                                        src={userIcon}
                                        alt="User Icon"
                                    />
                                </NavLink>
                                {showDropdown && (
                                    <div className={styles.dropdown}>
                                        <NavLink
                                            className={styles.dropdownLink}
                                            href="/profile"
                                        >
                                            Profile
                                        </NavLink>
                                        <NavLink
                                            className={styles.dropdownLink}
                                            href="/home"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </NavLink>
                                    </div>
                                )}
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
                <div className={styles.desktopNavbar}>
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                        <>
                            <div
                                className={`${styles.profileBox} ${
                                    showDropdown
                                        ? styles.profileBoxDropdownOpen
                                        : ""
                                }`}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                <p
                                    className={`${styles.link} ${styles.profileLink}`}
                                >
                                    <span>Menu</span>
                                    <Image
                                        className={styles.userIcon}
                                        src={userIcon}
                                        alt="User Icon"
                                    />
                                </p>
                                {showDropdown && (
                                    <>
                                        {user ? (
                                            <div className={styles.dropdown}>
                                                <NavLink
                                                    className={
                                                        styles.dropdownLink
                                                    }
                                                    href="/home"
                                                >
                                                    Home
                                                </NavLink>
                                                <NavLink
                                                    className={
                                                        styles.dropdownLink
                                                    }
                                                    href="/home/favourites"
                                                >
                                                    Favourites
                                                </NavLink>
                                                <NavLink
                                                    className={
                                                        styles.dropdownLink
                                                    }
                                                    href="/home/visited"
                                                >
                                                    Visited
                                                </NavLink>
                                                {location && (
                                                    <NavLink
                                                        className={
                                                            styles.dropdownLink
                                                        }
                                                        href="/restaurants"
                                                    >
                                                        Restaurants
                                                    </NavLink>
                                                )}
                                                <NavLink
                                                    className={
                                                        styles.dropdownLink
                                                    }
                                                    href="/profile"
                                                >
                                                    Profile
                                                </NavLink>
                                                <NavLink
                                                    className={
                                                        styles.dropdownLink
                                                    }
                                                    href="/home"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </NavLink>
                                            </div>
                                        ) : (
                                            <div className={styles.dropdown}>
                                                <NavLink
                                                    className={
                                                        styles.dropdownLink
                                                    }
                                                    href="/login"
                                                >
                                                    Login
                                                </NavLink>
                                                <NavLink
                                                    className={
                                                        styles.dropdownLink
                                                    }
                                                    href="/register"
                                                >
                                                    Register
                                                </NavLink>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
