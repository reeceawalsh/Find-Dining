import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@component/components/Layout";
import Header from "@component/components/Header";
import styles from "./styles/profile.module.css";

export default function Profile() {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        // Redirect logged-out users to the homepage
        if (!user) {
            router.push("/home");
        }
    }, [user, router]);
    return (
        <Layout user={user}>
            <div className={styles.container}>
                <div className={styles.rightContainer}>
                    <Header name="Profile Page" />
                    {user && (
                        <div>
                            <h1>
                                User - {!loading ? user.username : "Loading..."}{" "}
                            </h1>
                        </div>
                    )}
                </div>
                <div className={styles.leftContainer}>
                    <h1>Profile</h1>
                    <Link
                        className={styles.link}
                        href="/profile/dietaryrestrictions"
                    >
                        Dietary Restrictions
                    </Link>
                    <Link className={styles.link} href="/profile/achievements">
                        Achievements
                    </Link>
                    <Link
                        className={styles.link}
                        href="/profile/accountdetails"
                    >
                        Account Details
                    </Link>
                    <Link className={styles.link} href="/profile/support">
                        Support
                    </Link>
                    <Link className={styles.link} href="/profile/privacynotice">
                        Privacy Notice
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
