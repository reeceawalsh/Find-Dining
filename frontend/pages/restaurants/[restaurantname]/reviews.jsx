import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
import Header from "@component/components/Header";
import useRestaurantName from "../../../lib/useRestaurantName";

export default function Reviews() {
    const { user, loading } = useUser();
    const restaurantName = useRestaurantName();

    return (
        <Layout user={user}>
            <div className="container">
                <Header name={`${restaurantName} - Reviews`} />
            </div>
        </Layout>
    );
}
