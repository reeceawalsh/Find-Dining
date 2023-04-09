import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";

export default function Home() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                <h1>Find Dining</h1>
                {user ? (
                    <div>
                        <h1>
                            Welcome back{" "}
                            {!loading ? user.username : "Loading..."}{" "}
                        </h1>
                    </div>
                ) : (
                    <div>
                        <h2>
                            Please login or register to access your profile.
                        </h2>
                    </div>
                )}
            </div>
        </Layout>
    );
}
