import { useUser } from "@component/lib/authContext";
import Header from "@component/components/Header";
import Layout from "../../components/Layout";

export default function Home() {
    const { user, loading } = useUser();
    console.log(user);
    return (
        <Layout>
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
