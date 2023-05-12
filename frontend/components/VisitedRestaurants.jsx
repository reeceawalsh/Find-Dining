import { useState, useEffect } from "react";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";
import { useUser } from "@component/lib/authContext";
import fetchHistory from "@component/lib/fetchHistory";

// displays all of the restaurants that the user has marked as visited.
const VisitedRestaurants = ({
    restaurants,
    favourites,
    updateFavourites,
    history,
    updateHistory,
    setHistory,
}) => {
    const { user } = useUser();
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

    // runs through the list of restaurants passed in to ensure that each restaurant in the list is definitely in the history.
    useEffect(() => {
        setFilteredRestaurants(
            restaurants.filter((restaurant) =>
                history.some((visited) => visited.id === restaurant.id)
            )
        );
    }, [history, restaurants]);

    // updates history with the databases history
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

    return (
        <div className={`container`}>
            <h1 className="orange-font padding-top">Visited Restaurants</h1>
            <div className={styles.restaurantsWrapper}>
                {filteredRestaurants.map((restaurant, index) => (
                    <Restaurant
                        key={index}
                        restaurant={restaurant}
                        history={history}
                        setHistory={setHistory}
                        updateHistory={updateHistory}
                        updateFavourites={updateFavourites}
                        favourites={favourites}
                    />
                ))}
            </div>
        </div>
    );
};

export default VisitedRestaurants;
