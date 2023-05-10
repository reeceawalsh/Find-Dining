import { useState, useEffect } from "react";
import Layout from "@component/components/Layout";
import styles from "./styles/favourites.module.css";
import { useUser } from "@component/lib/authContext";
import fetchFavouriteRestaurants from "@component/lib/fetchFavouriteRestaurants";
import FavouriteRestaurants from "@component/components/FavouriteRestaurants";
import fetchYelpRestaurantDetails from "@component/lib/fetchYelpRestaurantDetails";
import addToFavourites from "@component/lib/addToFavourites";
import fetchHistory from "@component/lib/fetchHistory";
import addToHistory from "@component/lib/addToHistory";
import { useRouter } from "next/router";

// route -> home/favourites
export default function Favourites() {
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

    // updates the users local favourites array
    const updateFavourites = (newFavourites) => {
        setFavourites(newFavourites);
        addToFavourites(newFavourites, user.id);
    };

    // updates the users local history array
    const updateHistory = (newHistory) => {
        setHistory(newHistory);
        addToHistory(newHistory, user.id);
    };

    // fetches latest history
    useEffect(() => {
        const getData = async () => {
            const data = await fetchHistory(user.id);
            const temp = [];
            if (data) {
                data.map((restaurant) =>
                    temp.push({
                        uuid: restaurant.id,
                        id: restaurant.restaurantID,
                    })
                );
                setHistory(temp);
            }
        };
        if (user) {
            getData();
        }
    }, [user]);

    // fetches latest favourites
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
                    fetchYelpRestaurantDetails(restaurant.restaurantID)
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
                            You have no favourite restaurants.
                        </p>
                    )}
                    {restaurants.length !== 0 && (
                        <FavouriteRestaurants
                            restaurants={restaurants}
                            favourites={favourites}
                            setFavourites={setFavourites}
                            updateFavourites={updateFavourites}
                            updateHistory={updateHistory}
                            history={history}
                        />
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
