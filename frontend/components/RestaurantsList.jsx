import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useLocation from "@component/lib/useLocation";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";
import cuisines from "../lib/cuisines.json";
import filters from "../lib/filters.json";
import { useUser } from "@component/lib/authContext";
import fetchUserData from "@component/lib/fetchUserData";
import fetchRestaurantID from "@component/lib/fetchRestaurantID";

const RestaurantsList = () => {
    const { user, loading } = useUser();
    const location = useLocation();
    const loader = useRef(null);
    const { lat, lng } = location;
    const [restaurants, setRestaurants] = useState([]);
    const [cuisine, setCuisine] = useState("");
    const [renderedIds, setRenderedIds] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [userData, setUserData] = useState(null);

    // can sort by rating, review_count, distance, price, open_now and best_match (Default)
    const [sortType, setSortType] = useState("best_match");

    // Yelps maximum radius is 40k
    const [radius, setRadius] = useState(40000);
    const [page, setPage] = useState(1);

    // fetch data from yelp for the restaurants
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/yelp", {
                params: {
                    latitude: lat,
                    longitude: lng,
                    term: cuisine,
                    sort_by: sortType,
                    radius: radius,
                    offset: (page - 1) * 10,
                    limit: 10,
                },
            });

            // will only add restaurants that haven't already been added as the yelp api gives back duplicate results sometimes.
            const newRestaurants = response.data.businesses.filter(
                (restaurant) => {
                    return !renderedIds.includes(restaurant.id);
                }
            );
            const newIds = newRestaurants.map((restaurant) => restaurant.id);
            renderedIds.push(...newIds);
            setRestaurants((prevRestaurants) => {
                return [...prevRestaurants, ...newRestaurants];
            });
            newRestaurants.forEach(async (restaurant) => {
                await fetchRestaurantID(restaurant.id, restaurant.name);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [cuisine, sortType, lat, lng, page]);

    // handles the cuisine dropdown option changing
    const handleCuisineChange = (e) => {
        setPage(1);
        setRestaurants([]);
        setCuisine(e.target.value);
        setRenderedIds([]);
    };

    // handles the sort filter dropdown option changing
    const handleSortChange = (e) => {
        setPage(1);
        setRestaurants([]);
        setSortType(e.target.value);
        setRenderedIds([]);
    };

    // fully resets both dropdowns and search parameters
    const reset = (e) => {
        e.preventDefault();
        setCuisine("");
        setSortType("best_match");
        document.getElementById("cuisine-type-select").value = "";
        document.getElementById("sort-type-select").value = "";
    };

    // will load more restaurants once the user hits the bottom of the page
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
    }, []);

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
            <div className={styles.top}>
                <div className={styles.options}>
                    <select
                        onChange={handleCuisineChange}
                        id="cuisine-type-select"
                        defaultValue="Select a Cuisine"
                    >
                        <option value="" selected disabled>
                            Select a Cuisine
                        </option>
                        {cuisines.map((type) => {
                            return (
                                <option value={type.key}>{type.value}</option>
                            );
                        })}
                    </select>
                    <select onChange={handleSortChange} id="sort-type-select">
                        <option value="" selected disabled>
                            Filter By:
                        </option>
                        {filters.map((type) => {
                            return (
                                <option value={type.key}>{type.value}</option>
                            );
                        })}
                    </select>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={reset}>
                        Reset
                    </button>
                </div>
            </div>

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
            <div ref={loader} className={styles.loader}></div>
        </div>
    );
};

export default RestaurantsList;
