import { useState, useEffect } from "react";
import Layout from "@component/components/Layout";
import styles from "./styles/favourites.module.css";
import fetchFavouriteRestaurants from "@component/lib/fetchFavouriteRestaurants";
import { useUser } from "@component/lib/authContext";
import fetchYelpRestaurantDetails from "@component/lib/fetchYelpRestaurantDetails";
import FavouriteRestaurants from "@component/components/FavouriteRestaurants";

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        if (user) {
            const data = await fetchFavouriteRestaurants(user.id);
            if (data) {
                console.log(data);
                const validData = data.filter(
                    (restaurant) => restaurant && restaurant.restaurantID
                );
                const yelpDataPromises = validData.map((restaurant) =>
                    fetchYelpRestaurantDetails(
                        restaurant.restaurantID,
                        process.env.NEXT_PUBLIC_YELP_API_KEY
                    )
                );
                const yelpDataResults = await Promise.all(yelpDataPromises);
                setRestaurants(yelpDataResults);
            } else {
                console.log("No favourites.");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            {!loading ? (
                <div className="container">
                    {restaurants.length === 0 && (
                        <p className={styles.message}>
                            You have no favorite restaurants.
                        </p>
                    )}
                    {restaurants.length !== 0 && (
                        <FavouriteRestaurants restaurants={restaurants} />
                    )}
                </div>
            ) : (
                <p className={styles.message}>
                    Retrieiving your favourite restaurants.
                </p>
            )}
        </Layout>
    );
}
