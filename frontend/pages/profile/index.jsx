import { useUser } from "@component/lib/authContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@component/components/Layout";
import styles from "./styles/profile.module.css";
import AccountDetails from "../../components/AccountDetails";
import Support from "../../components/Support";
import Image from "next/image";

// route -> /profile
export default function Profile() {
    const { user } = useUser();
    const [page, setPage] = useState("Account Details");
    const router = useRouter();

    // icons
    const orangeSpannerIcon = require("/public/OrangeSpannerIcon.svg");
    const blackSpannerIcon = require("/public/BlackSpannerIcon.svg");
    const orangeHelpIcon = require("/public/OrangeHelpIcon.svg");
    const blackHelpIcon = require("/public/BlackHelpIcon.svg");

    // controls changing page (displaying different components)
    const changePage = (pageName) => {
        setPage(pageName);
    };

    useEffect(() => {
        // redirect logged-out users to the homepage
        if (!user) {
            router.push("/home");
        }
    }, [user, router]);

    // calls a rerender on page change
    useEffect(() => {}, [page]);

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.rightContainer}>
                    {page == "Account Details" && <AccountDetails />}
                    {page == "Support" && <Support />}
                </div>
                <div className={styles.leftContainer}>
                    {/* The left container contains some links, clicking a link will "change the page" and display that component in the right container. */}
                    <button
                        className={styles.link}
                        onClick={() => changePage("Account Details")}
                        style={{
                            color: page == "Account Details" && "#ee7674",
                        }}
                    >
                        <div className={styles.buttonContainer}>
                            {page == "Account Details" ? (
                                <Image
                                    className={styles.icon}
                                    src={orangeSpannerIcon}
                                    alt="Orange spanner icon"
                                />
                            ) : (
                                <Image
                                    className={styles.icon}
                                    src={blackSpannerIcon}
                                    alt="Black spanner icon"
                                />
                            )}
                            <span className={styles.iconText}>
                                Accounts Details
                            </span>
                        </div>
                    </button>

                    <button
                        className={styles.link}
                        onClick={() => changePage("Support")}
                        style={{ color: page == "Support" && "#ee7674" }}
                    >
                        <div className={styles.buttonContainer}>
                            {page == "Support" ? (
                                <Image
                                    className={styles.icon}
                                    src={orangeHelpIcon}
                                    alt="Orange help icon"
                                />
                            ) : (
                                <Image
                                    className={styles.icon}
                                    src={blackHelpIcon}
                                    alt="Black help icon"
                                />
                            )}
                            <span className={styles.iconText}>Support</span>
                        </div>
                    </button>
                </div>
            </div>
        </Layout>
    );
}
