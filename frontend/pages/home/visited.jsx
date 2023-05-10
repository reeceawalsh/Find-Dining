import { useState, useEffect } from "react";
import Layout from "@component/components/Layout";
import styles from "./styles/favourites.module.css";
import { useUser } from "@component/lib/authContext";
import fetchHistory from "@component/lib/fetchHistory";
import VisitedRestaurants from "@component/components/VisitedRestaurants";
import fetchYelpRestaurantDetails from "@component/lib/fetchYelpRestaurantDetails";
import addToFavourites from "@component/lib/addToFavourites";
import fetchFavouriteRestaurants from "@component/lib/fetchFavouriteRestaurants";
import addToHistory from "@component/lib/addToHistory";
import { useRouter } from "next/router";

// route -> home/visited
// contains all of the users restaurants that they have visited.
export default function Visited() {
    const [restaurants, setRestaurants] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [favourites, setFavourites] = useState([]);
    const [history, setHistory] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // redirect logged-out users to the homepage
        if (!user) {
            router.push("/home");
        }
    }, [user, router]);

    // updates local favourites array
    const updateFavourites = (newFavourites) => {
        setFavourites(newFavourites);
        addToFavourites(newFavourites, user.id);
    };

    // updates local history array
    const updateHistory = (newHistory) => {
        setHistory(newHistory);
        addToHistory(newHistory, user.id);
    };

    // fetches favourite restaurants from database
    useEffect(() => {
        const getData = async () => {
            const data = await fetchFavouriteRestaurants(user.id);
            const temp = [];
            if (data) {
                data.map((restaurant) =>
                    temp.push({
                        uuid: restaurant.id,
                        id: restaurant.restaurantID,
                    })
                );
                setFavourites(temp);
                console.log(favourites);
            }
        };
        if (user) {
            getData();
        }
    }, [user]);

    // fetches visited restaurants from database
    const fetchVisited = async () => {
        setLoading(true);
        if (user) {
            const data = await fetchHistory(user.id);
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
                console.log("No visited restaurants.");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchVisited();
    }, []);

    return (
        <Layout>
            {!loading ? (
                <div className="container">
                    {restaurants.length === 0 && (
                        <p className={styles.message}>
                            You have no visited restaurants.
                        </p>
                    )}
                    {restaurants.length !== 0 && (
                        <VisitedRestaurants
                            restaurants={restaurants}
                            favourites={favourites}
                            setHistory={setHistory}
                            updateFavourites={updateFavourites}
                            updateHistory={updateHistory}
                            history={history}
                        />
                    )}
                </div>
            ) : (
                <p className={styles.message}>
                    Retrieiving your visited restaurants.
                </p>
            )}
        </Layout>
    );
}
