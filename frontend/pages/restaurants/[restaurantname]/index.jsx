import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
import Header from "@component/components/Header";

export default function RestaurantInfo() {
    const router = useRouter();
    const { user, loading } = useUser();
    // returns the name of the restaurant based on the url
    const getRestaurantName = (path) => {
        const pathArray = path.split("/");
        return pathArray[pathArray.length - 1];
    };
    const restaurantName = getRestaurantName(router.asPath);

    return (
        <Layout user={user}>
            <div className="container">
                <Header name={restaurantName} />
                <Link className="link" href={`${router.asPath}/reviews`}>
                    Reviews
                </Link>
                <Link className="link" href={`${router.asPath}/writereview`}>
                    Write Review
                </Link>
            </div>
        </Layout>
    );
}
