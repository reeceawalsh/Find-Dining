import Link from "next/link";
import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";

export default function Home() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                <h1>Home Page</h1>
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
                <div>
                    <Link className="link" href="/home/about">
                        About
                    </Link>
                    <Link className="link" href="/home/favourites">
                        Favourites
                    </Link>
                    <Link className="link" href="/home/search">
                        Search
                    </Link>
                    <Link className="link" href="/home/setlocation">
                        Set Location
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
