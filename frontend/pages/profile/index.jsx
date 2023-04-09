import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@component/components/Layout";
import Header from "@component/components/Header";

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
            <div className="container">
                <Header name="Profile Page" />
                {user && (
                    <div>
                        <h1>
                            Welcome back{" "}
                            {!loading ? user.username : "Loading..."}{" "}
                        </h1>
                    </div>
                )}
                <div>
                    <Link className="link" href="/profile/dietaryrestrictions">
                        Dietary Restrictions
                    </Link>
                    <Link className="link" href="/profile/achievements">
                        Achievements
                    </Link>
                    <Link className="link" href="/profile/accountdetails">
                        Account Details
                    </Link>
                    <Link className="link" href="/profile/support">
                        Support
                    </Link>
                    <Link className="link" href="/profile/privacynotice">
                        Privacy Notice
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
