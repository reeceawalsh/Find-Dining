import Layout from "@component/components/Layout";
import { useUser } from "@component/lib/authContext";
import Header from "@component/components/Header";

export default function History() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                <Header name="History Page" />
            </div>
        </Layout>
    );
}
