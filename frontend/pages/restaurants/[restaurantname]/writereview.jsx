import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";

export default function WriteReview() {
    const { user, loading } = useUser();
    return (
        <Layout user={user}>
            <div className="container">
                <h1>Write a review for that restaurant</h1>
            </div>
        </Layout>
    );
}
