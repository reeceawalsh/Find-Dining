import { useState, useEffect, useRef, useMemo } from "react";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";
import { useUser } from "@component/lib/authContext";
import addToFavourites from "@component/lib/addToFavourites";
import fetchFavouriteRestaurants from "@component/lib/fetchFavouriteRestaurants";

const FavouriteRestaurants = ({
    restaurants,
    favourites,
    setFavourites,
    updateFavourites,
    history,
    updateHistory,
}) => {
    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

    const { user } = useUser();
    useEffect(() => {
        setFilteredRestaurants(
            restaurants.filter((restaurant) =>
                favourites.some((fav) => fav.id === restaurant.id)
            )
        );
    }, [favourites, restaurants]);
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

    return (
        <div className={`container`}>
            <h1 className="orange-font padding-top">Favourite Restaurants</h1>
            <div className={styles.restaurantsWrapper}>
                {filteredRestaurants.map((restaurant, index) => (
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
        </div>
    );
};

export default FavouriteRestaurants;
