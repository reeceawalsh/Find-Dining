import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
export default function Favourites() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                <h1>Favourites Page</h1>
            </div>
        </Layout>
    );
}
