import { useState, useEffect } from "react";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";
import { useUser } from "@component/lib/authContext";
import addToFavourites from "@component/lib/addToFavourites";
import fetchFavouriteRestaurants from "@component/lib/fetchFavouriteRestaurants";
import addToHistory from "@component/lib/addToHistory";
import fetchHistory from "@component/lib/fetchHistory";

// this component is the list view which shows a list of restaurants.
const RestaurantsList = ({
    setPage,
    restaurants,
    noMoreRestaurants,
    loader,
}) => {
    const { user } = useUser();
    const [favourites, setFavourites] = useState([]);
    const [history, setHistory] = useState([]);

    // handles updating favourites list
    const updateFavourites = (newFavourites) => {
        setFavourites(newFavourites);
        addToFavourites(newFavourites, user.id);
    };

    // handles updating the history list
    const updateHistory = (newHistory) => {
        setHistory(newHistory);
        addToHistory(newHistory, user.id);
    };

    // this use effect "turns the page" i.e. loads more restaurants if possible, once the user scrolls down enough.
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        }, options);

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loader]);

    // ensure the list of favourite restaurants for the user is up to date
    useEffect(() => {
        const getData = async () => {
            // fetching favourite restaurants will retrieve restaurants from our database which will come with a uuid and a yelp id.
            const favouritesData = await fetchFavouriteRestaurants(user.id);
            const temp = [];
            // if there are favourites, it maps through them and sets favourites to equal just the uuid and id. this is the only required data.
            if (favouritesData) {
                favouritesData.map((restaurant) =>
                    temp.push({
                        uuid: restaurant.id,
                        id: restaurant.restaurantID,
                    })
                );
                setFavourites(temp);
            }
            // fetching visited restaurants from the database
            const historyData = await fetchHistory(user.id);
            const temp2 = [];
            if (historyData) {
                historyData.map((restaurant) =>
                    temp2.push({
                        uuid: restaurant.id,
                        id: restaurant.restaurantID,
                    })
                );
            }
            // sets the array to be the most up to date version of visited restaurants.
            setHistory(temp2);
        };
        // will only run if there is a user logged in
        if (user) {
            getData();
        }
        // there is a user dependency arrray to ensure it reruns if the user changes as they will have different visited and favourites.
    }, [user]);

    return (
        <div className={`container`}>
            <div className={styles.restaurantsWrapper}>
                {restaurants.map((restaurant, index) => (
                    <Restaurant
                        key={index}
                        restaurant={restaurant}
                        favourites={favourites}
                        setFavourites={setFavourites}
                        updateFavourites={updateFavourites}
                        history={history}
                        updateHistory={updateHistory}
                    />
                ))}
            </div>
            {/* If there are no more restaurants it will display a message informing the user. */}
            {noMoreRestaurants && (
                <div>
                    <p>
                        There are no more restaurants that fit this criteria.
                        Please change your criteria or location to find matching
                        restaurants in your area.
                    </p>
                </div>
            )}
            {/* If there are more restaurants to load, it will display a spinner */}
            {!noMoreRestaurants && (
                <div ref={loader} className={styles.loader}></div>
            )}
        </div>
    );
};

export default RestaurantsList;
