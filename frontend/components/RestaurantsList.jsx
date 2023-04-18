import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import useLocation from "@component/lib/useLocation";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";
import { useLoadScript } from "@react-google-maps/api";

import useFetchNearbyRestaurants from "../lib/useFetchRestaurants";

const RestaurantsList = () => {
    const location = useLocation();
    const { lat, lng } = location;
    // const [restaurants, setRestaurants] = useState([]);
    const [cuisine, setCuisine] = useState("");
    const [sortType, setSortType] = useState("rating");
    const [mapCenter, setMapCenter] = useState({
        lat: lat,
        lng: lng,
    });
    const libraries = useMemo(() => ["places"], []);

    const [radius, setRadius] = useState(1000);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    // const fetchData = async () => {
    //     console.log(lat);
    //     console.log(lng);
    //         try {
    //             // Yelp API
    //             // const response = await axios.get("/api/yelp", {
    //             //     params: {
    //             //         latitude: lat,
    //             //         longitude: lng,
    //             //         categories: cuisine,
    //             //         sort_by: sortType,
    //             //     },
    //             // Google maps API
    //             const response = await axios.get("/api/googlemaps", {
    //                 params: {
    //                     location: `${lat},${lng}`,
    //                     cuisine: cuisine,
    //                     sortType: sortType,
    //                 },
    //             });

    //             setRestaurants(response.data.businesses);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     }
    // };

    const restaurants = useFetchNearbyRestaurants(mapCenter, radius, isLoaded);

    useEffect(() => {}, [cuisine, sortType, lat, lng]);

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
                {restaurants && restaurants.length > 0 ? (
                    restaurants.map((restaurant) => (
                        <Restaurant
                            key={restaurant.place_id}
                            restaurant={restaurant}
                        />
                    ))
                ) : (
                    <p>Loading restaurants...</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantsList;
