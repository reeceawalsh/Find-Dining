import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@component/components/Layout";
import styles from "./styles/profile.module.css";
import AccountDetails from "../../components/AccountDetails";
import Achievements from "../../components/Achievements";
import Support from "../../components/Support";
import PrivacyNotice from "../../components/PrivacyNotice";
import Image from "next/image";

export default function Profile() {
    const { user, loading, setUser } = useUser();
    const [page, setPage] = useState("Account Details");
    const router = useRouter();
    console.log("Profile");
    console.log(user);

    const orangeSpannerIcon = require("/public/OrangeSpannerIcon.svg");
    const blackSpannerIcon = require("/public/BlackSpannerIcon.svg");
    const orangeAwardIcon = require("/public/OrangeAwardIcon.svg");
    const blackAwardIcon = require("/public/BlackAwardIcon.svg");
    const orangeHelpIcon = require("/public/OrangeHelpIcon.svg");
    const blackHelpIcon = require("/public/BlackHelpIcon.svg");


    const changePage = (pageName) => {
        setPage(pageName);
    };

    useEffect(() => {
        // Redirect logged-out users to the homepage
        if (!user) {
            router.push("/home");
        }
    }, [user, router]);

    useEffect(() => {}, [page]);
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.rightContainer}>
                    {page == "Account Details" && <AccountDetails />}
                    {page == "Achievements" && <Achievements />}
                    {page == "Support" && <Support />}
                </div>
                <div className={styles.leftContainer}>
                    <button
                        className={styles.link}
                        onClick={() => changePage("Account Details")}
                        style = {{color: page == "Account Details" && "#ee7674"}}
                    >
                        <div className={styles.buttonContainer}>
                        {page == "Account Details" ?
                        <Image
                            className={styles.icon}
                            src={orangeSpannerIcon}
                            alt="Orange spanner icon"
                        />
                        :<Image
                            className={styles.icon}
                            src={blackSpannerIcon}
                            alt="Black spanner icon"
                            />
                        }
                        <span className={styles.iconText}>Accounts Details</span>
                        </div>
                    </button>
                    <button
                        className={styles.link}
                        onClick={() => changePage("Achievements")}
                        style = {{color: page == "Achievements" && "#ee7674"}}
                    >
                        <div className={styles.buttonContainer}>
                        {page == "Achievements" ?
                        <Image
                            className={styles.icon}
                            src={orangeAwardIcon}
                            alt="Orange award icon"
                        />
                        :<Image
                            className={styles.icon}
                            src={blackAwardIcon}
                            alt="Black award icon"
                            />
                        }
                        <span className={styles.iconText}>Achievements</span>
                        </div>
                    </button>
                    <button
                        className={styles.link}
                        onClick={() => changePage("Support")}
                        style = {{color: page == "Support" && "#ee7674"}}
                    >
                        <div className={styles.buttonContainer}>
                            {page == "Support" ?
                            <Image
                                className={styles.icon}
                                src={orangeHelpIcon}
                                alt="Orange help icon"
                            />
                            :<Image
                                className={styles.icon}
                                src={blackHelpIcon}
                                alt="Black help icon"
                                />
                            }
                            <span className={styles.iconText}>Support</span>
                        </div>
                    </button>
                </div>
            </div>
        </Layout>
    );
}
