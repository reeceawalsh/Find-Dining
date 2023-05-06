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

export default function Profile() {
    const { user, loading, setUser } = useUser();
    const [page, setPage] = useState("Account Details");
    const router = useRouter();
    console.log("Profile");
    console.log(user);

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
                </div>
            </div>
        </Layout>
    );
}
