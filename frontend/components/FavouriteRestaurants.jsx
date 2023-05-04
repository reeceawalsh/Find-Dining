import { useState, useEffect, useRef, useMemo } from "react";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";
import { useUser } from "@component/lib/authContext";
import addToFavourites from "@component/lib/addToFavourites";
import fetchFavouriteRestaurants from "@component/lib/fetchFavouriteRestaurants";

const FavouriteRestaurants = ({ restaurants }) => {
    const { user } = useUser();
    const [favourites, setFavourites] = useState([]);

    const updateFavourites = (newFavourites) => {
        setFavourites(newFavourites);
        addToFavourites(newFavourites, user.id);
    };

    // ensure the list of favourite restaurants for the user is up to date
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
            <div className={styles.restaurantsWrapper}>
                {restaurants.map((restaurant, index) => (
                    <Restaurant
                        key={index}
                        restaurant={restaurant}
                        favourites={favourites}
                        setFavourites={setFavourites}
                        updateFavourites={updateFavourites}
                    />
                ))}
            </div>
        </div>
    );
};

export default FavouriteRestaurants;
