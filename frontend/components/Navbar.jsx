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

const Navbar = () => {
    const { user, loading, logout } = useUser();
    const { currentLocation, searchedLocation, setSearchedLocation } =
        useContext(Location);
    const router = useRouter();
    const handleLogout = () => {
        logout();
    };
    const [currPostCode, setCurrPostCode] = useState(null);
    const [searchedPostCode, setSearchedPostCode] = useState(null);

    // will use the users actual location if they're on the home page and their searched for location if they're not.
    const handleSearch = () => {
        if (router.pathname === "/home") {
            if (currentLocation?.lat && currentLocation?.lng) {
                // need to set the searchedLocation to the current location as the restaurants page will look at the searchedLocation's lat and lng and for all intents and purposes, the current location is now the searched location.
                setSearchedLocation(currentLocation);
                router.push("/restaurants");
            }
        } else {
            if (searchedLocation?.lat && searchedLocation?.lng) {
                router.push("/restaurants");
            }
        }
    };

    // we want to display the post code of the users geo location if they're on the home page and their searched location, if they have one, if they're not on the home page. it will also just display no post code if neither is available.
    const displayPostCode = () => {
        if (router.pathname === "/home") {
            return currPostCode;
        } else {
            return searchedPostCode || currPostCode;
        }
    };

    // this useEffect will run when a currentLocation or a searchedLocation is updated, as when it runs on mount neither of these will be defined. this function retrieves both post codes from both locations and sets them in state.
    useEffect(() => {
        fetchPostCode(currentLocation)
            .then((postCode) => setCurrPostCode(postCode))
            .catch((error) => console.error("Error fetching postcode:", error));
        if (searchedLocation) {
            fetchPostCode(searchedLocation)
                .then((postCode) => setSearchedPostCode(postCode))
                .catch((error) =>
                    console.error("Error fetching postcode:", error)
                );
        }
    }, [currentLocation, searchedLocation]);

    return (
        <div className={`${styles.navbar} blue-background`}>
            <div className={styles.logoContainer}>
                <Link href="/home">
                    <Image
                        className="logo"
                        src={logo}
                        alt="Find Dining Logo - A very cute burger with a knife and fork."
                        priority="true"
                    />
                </Link>
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
                        <NavLink className={styles.link} href="/restaurants">
                            Find Dining
                        </NavLink>
                    </>
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
