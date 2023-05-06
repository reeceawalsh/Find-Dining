import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
import fetchYelpRestaurantDetails from "@component/lib/fetchYelpRestaurantDetails";
import fetchYelpRestaurantReviews from "@component/lib/fetchYelpRestaurantReviews";
import RestaurantPage from "@component/components/RestaurantPage";
import Spinner from "@component/components/Spinner";
import fetchRestaurantID from "@component/lib/fetchRestaurantID";
import fetchRestaurantReviews from "@component/lib/fetchRestaurantReviews";
export default function RestaurantInfo() {
    const router = useRouter();
    const { user, loading } = useUser();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [strapiRestaurantDetails, setStrapiRestaurantDetails] =
        useState(null);
    // returns the name of the restaurant based on the url
    const getRestaurantName = (path) => {
        const decodedPath = decodeURIComponent(path);
        const pathArray = decodedPath.split("/");
        const lastPathSegment = pathArray[pathArray.length - 1];
        // Remove the query string from the last path segment
        const restaurantName = lastPathSegment.split("?")[0];
        return restaurantName;
    };

    const restaurantName = getRestaurantName(router.asPath);
    const restaurantId = router.query.id;

    // base url path (/restaurants/[restaurantname]))
    const basePath = router.pathname;
    useEffect(() => {
        if (restaurantId) {
            const token = process.env.NEXT_PUBLIC_YELP_API_KEY;
            fetchYelpRestaurantDetails(restaurantId, token).then((data) => {
                setRestaurantDetails(data);
            });
        }
    }, [restaurantId]);

    useEffect(() => {
        const fetchData = async () => {
            if (restaurantId) {
                const restaurantData = await fetchRestaurantID(
                    restaurantId,
                    restaurantName
                );
                if (restaurantData) {
                    setStrapiRestaurantDetails(restaurantData);
                    const reviewData = await fetchRestaurantReviews(
                        restaurantData.id
                    );
                    if (reviewData) {
                        setReviews(reviewData);
                        console.log(reviewData);
                    }
                }
            }
        };
        fetchData();
    }, [restaurantId]);

    // to fetch YELP reviews (not in use)
    // useEffect(() => {
    //     if (restaurantId) {
    //         const token = process.env.NEXT_PUBLIC_YELP_API_KEY;
    //         fetchYelpRestaurantReviews(restaurantId, token).then((data) => {
    //             setReviews(data.reviews);
    //             console.log(data);
    //         });
    //     }
    // }, [restaurantId]);

    return (
        <Layout user={user}>
            <div>
                {restaurantDetails ? (
                    <RestaurantPage
                        restaurant={restaurantDetails}
                        reviews={reviews}
                        setReviews={setReviews}
                        strapiRestaurantDetails={strapiRestaurantDetails}
                    />
                ) : (
                    <Spinner />
                )}
            </div>
        </Layout>
    );
}
