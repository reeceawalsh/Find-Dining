import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
export default function Search() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                <h1>Search Page</h1>
            </div>
        </Layout>
    );
}
