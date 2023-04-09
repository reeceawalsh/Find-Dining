import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";

export default function Reviews() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                <h1>Specific Restaurant Reviews</h1>
            </div>
        </Layout>
    );
}
