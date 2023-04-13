import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
import Header from "@component/components/Header";
export default function Favourites() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                <Header name="Favourites Page" />
            </div>
        </Layout>
    );
}
