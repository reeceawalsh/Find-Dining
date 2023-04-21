import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useLocation from "@component/lib/useLocation";
import Restaurant from "./Restaurant";
import styles from "./styles/restaurantsList.module.css";

const RestaurantsList = () => {
    const location = useLocation();
    const loader = useRef(null);
    const { lat, lng } = location;
    const [restaurants, setRestaurants] = useState([]);
    const [cuisine, setCuisine] = useState("");
    const [renderedIds, setRenderedIds] = useState([]);

    const allCuisines = [
        { key: "", value: "All Cuisines" },
        { key: "Asian fusion", value: "Asian fusion" },
        { key: "Bangladeshi", value: "Bangladeshi" },
        { key: "Brazilian", value: "Brazilian" },
        { key: "British", value: "British" },
        { key: "Carribean", value: "Carribean" },
        { key: "Chinese", value: "Chinese" },
        { key: "Cuban", value: "Cuban" },
        { key: "Ethiopian", value: "Ethiopian" },
        { key: "Filipino", value: "Filipino" },
        { key: "French", value: "French" },
        { key: "German", value: "German" },
        { key: "Greek", value: "Greek" },
        { key: "Indian", value: "Indian" },
        { key: "Indonesian", value: "Indonesian" },
        { key: "Italian", value: "Italian" },
        { key: "Japenese", value: "Japenese" },
        { key: "Korean", value: "Korean" },
        { key: "Lebanese", value: "Lebanese" },
        { key: "Malaysian", value: "Malaysian" },
        { key: "Mexican", value: "Mexican" },
        { key: "Moroccan", value: "Moroccan" },
        { key: "Pakistani", value: "Pakistani" },
        { key: "Portuguese", value: "Portuguese" },
        { key: "Spanish", value: "Spanish" },
        { key: "Thai", value: "Thai" },
        { key: "Turkish", value: "Turkish" },
        { key: "Vietnamese", value: "Vietnamese" },
    ];

    // can sort by rating, review_count, distance, price, open_now and best_match (Default)
    const [sortType, setSortType] = useState("best_match");
    const [allSortTypes, setAllSortTypes] = useState([
        { key: "best_match", value: "Best match" },
        { key: "rating", value: "Rating" },
        { key: "review_count", value: "Amount of Reviews" },
        { key: "distance", value: "Distance" },
    ]);

    // Yelps maximum radius is 40k
    const [radius, setRadius] = useState(40000);
    const [page, setPage] = useState(1);

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
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [cuisine, sortType, lat, lng, page]);

    const handleCuisineChange = (e) => {
        setPage(1);
        setRestaurants([]);
        setCuisine(e.target.value);
        setRenderedIds([]);
    };

    const handleSortChange = (e) => {
        setPage(1);
        setRestaurants([]);
        setSortType(e.target.value);
        setRenderedIds([]);
    };

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
                        {allCuisines.map((type) => {
                            return (
                                <option value={type.key}>{type.value}</option>
                            );
                        })}
                    </select>
                    <select onChange={handleSortChange} id="sort-type-select">
                        <option value="" selected disabled>
                            Filter By:
                        </option>
                        {allSortTypes.map((type) => {
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
                    <Restaurant key={index} restaurant={restaurant} />
                ))}
            </div>
            <div ref={loader} className={styles.loader}></div>
        </div>
    );
};

export default RestaurantsList;
