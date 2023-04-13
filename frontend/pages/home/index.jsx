import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
import Header from "@component/components/Header";

export default function Home() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                <Header name="Find Dining" />
                {user ? (
                    <div>
                        <h1>
                            Welcome {!loading ? user.username : "Loading..."}{" "}
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
