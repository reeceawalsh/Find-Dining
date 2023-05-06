import { useState, useEffect, useRef, useMemo } from "react";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";
import { useUser } from "@component/lib/authContext";
import fetchUserData from "@component/lib/fetchUserData";
import addToFavourites from "@component/lib/addToFavourites";
import fetchFavouriteRestaurants from "@component/lib/fetchFavouriteRestaurants";

const RestaurantsList = ({
    setPage,
    restaurants,
    noMoreRestaurants,
    loader,
}) => {
    const { user } = useUser();
    const [favourites, setFavourites] = useState([]);
    const [userData, setUserData] = useState(null);

    const updateFavourites = (newFavourites) => {
        setFavourites(newFavourites);
        addToFavourites(newFavourites, user.id);
    };

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

            {noMoreRestaurants && (
                <div>
                    <p>
                        There are no more restaurants that fit this criteria.
                        Please change your criteria or location to find matching
                        restaurants in your area.
                    </p>
                </div>
            )}
            {!noMoreRestaurants && (
                <div ref={loader} className={styles.loader}></div>
            )}
        </div>
    );
};

export default RestaurantsList;
