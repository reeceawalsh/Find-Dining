import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
import fetchYelpRestaurantDetails from "@component/lib/fetchYelpRestaurantDetails";
import RestaurantPage from "@component/components/RestaurantPage";
import Spinner from "@component/components/Spinner";
import fetchRestaurantID from "@component/lib/fetchRestaurantID";
import fetchRestaurantReviews from "@component/lib/fetchRestaurantReviews";
import getRestaurantName from "@component/lib/getRestaurantName";

// route -> /restaurants/[restaurantName]
// the restaurant name is passed into the url when a user clicks on a restaurant, it also sends the id as well to be used and retrieved with router.query.id.
export default function RestaurantInfo() {
    const router = useRouter();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [strapiRestaurantDetails, setStrapiRestaurantDetails] =
        useState(null);
    const restaurantName = getRestaurantName(router.asPath);
    const restaurantId = router.query.id;

    // base url path (/restaurants/[restaurantname]))
    useEffect(() => {
        if (restaurantId) {
            fetchYelpRestaurantDetails(restaurantId).then((data) => {
                setRestaurantDetails(data);
            });
        }
    }, [restaurantId]);

    // fetches restaurant data for this restaurant and fetches the reviews for this restaurant
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

    // displays the page if it's loaded and a spinner if not
    return (
        <Layout>
            <div className="container">
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
