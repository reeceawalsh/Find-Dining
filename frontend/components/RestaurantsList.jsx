import { useState, useEffect, useRef, useMemo } from "react";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";
import { useUser } from "@component/lib/authContext";
import fetchUserData from "@component/lib/fetchUserData";

const RestaurantsList = ({
    setPage,
    restaurants,
    noMoreRestaurants,
    loader,
}) => {
    const { user } = useUser();
    const [favourites, setFavourites] = useState([]);
    const [userData, setUserData] = useState(null);
    // will load more restaurants once the user hits the bottom of the page
    console.log(restaurants);
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
            // get up-to-date userData
            const data = await fetchUserData(user.id);
            setUserData(data);
            // create temp for immutability
            const temp = [];
            // need the uuid for adding to favourites and need the yelp id (id) for checking if they are favourited already
            if (userData) {
                userData.restaurants.map((restaurant) =>
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
