import { useState, useEffect } from "react";
import axios from "axios";
import useLocation from "@component/lib/useLocation";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";

const RestaurantsList = () => {
    const location = useLocation();
    const { lat, lng } = location;
    const [restaurants, setRestaurants] = useState([]);
    const [cuisine, setCuisine] = useState("");
    const [sortType, setSortType] = useState("rating");

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/yelp", {
                params: {
                    latitude: lat,
                    longitude: lng,
                    categories: cuisine,
                    sort_by: sortType,
                },
            });

            setRestaurants(response.data.businesses);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [cuisine, sortType, lat, lng]);

    const handleCuisineClick = (cuisineType) => {
        setCuisine(cuisineType);
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    return (
        <div className="container">
            <div className={styles.buttons}>
                <button onClick={() => handleCuisineClick("indian")}>
                    Indian
                </button>
                <button onClick={() => handleCuisineClick("italian")}>
                    Italian
                </button>
                <button onClick={() => handleCuisineClick("chinese")}>
                    Chinese
                </button>
            </div>
            <div className={styles.filter}>
                <select onChange={handleSortChange}>
                    <option value="rating">Rating</option>
                    <option value="distance">Distance</option>
                </select>
            </div>

            <div className={styles.restaurantsWrapper}>
                {restaurants.map((restaurant) => (
                    <Restaurant key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantsList;
