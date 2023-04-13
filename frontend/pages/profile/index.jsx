import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@component/components/Layout";
import Header from "@component/components/Header";
import styles from "./styles/profile.module.css";
import AccountDetails from "../../components/AccountDetails";
import Achievements from "../../components/Achievements";
import Support from "../../components/Support";
import PrivacyNotice from "../../components/PrivacyNotice";

export default function Profile() {
    const { user, loading } = useUser();
    const [page, setPage] = useState("Account Details");
    const router = useRouter();

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
        <Layout user={user}>
            <div className={styles.container}>
                <div className={styles.rightContainer}>
                    <Header name="Profile Page" />
                    {user && (
                        <div>
                            {page == "Account Details" && <AccountDetails />}
                            {page == "Achievements" && <Achievements />}
                            {page == "Support" && <Support />}
                            {page == "Privacy Notice" && <PrivacyNotice />}
                        </div>
                    )}
                </div>
                <div className={styles.leftContainer}>
                    <h1>Profile</h1>
                    <button
                        className={styles.link}
                        onClick={() => changePage("Achievements")}
                    >
                        Achievements
                    </button>
                    <button
                        className={styles.link}
                        onClick={() => changePage("Account Details")}
                    >
                        Account Details
                    </button>
                    <button
                        className={styles.link}
                        onClick={() => changePage("Support")}
                    >
                        Support
                    </button>
                    <button
                        className={styles.link}
                        onClick={() => changePage("Privacy Notice")}
                    >
                        Privacy Notice
                    </button>
                </div>
            </div>
        </Layout>
    );
}
