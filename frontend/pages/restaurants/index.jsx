import { useState, useRef, useEffect, useMemo } from "react";
import Layout from "@component/components/Layout";
import { useUser } from "@component/lib/authContext";
import RestaurantsList from "@component/components/RestaurantsList";
import Toggle from "@component/components/FormElements/Toggle";
import Map from "@component/components/Map";
import useFetchRestaurants from "@component/lib/useFetchRestaurants";
import useLocation from "@component/lib/useLocation";
import fetchRestaurantID from "@component/lib/fetchRestaurantID";
import cuisines from "../../lib/cuisines.json";
import filters from "../../lib/filters.json";
import styles from "./restaurants.module.css";
import Spinner from "@component/components/Spinner";

export default function Restaurants() {
    const loader = useRef(null);
    const [selectedValue, setSelectedValue] = useState("List View");
    const location = useLocation();
    const [renderedIds, setRenderedIds] = useState([]);
    const [cuisine, setCuisine] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    // Yelps maximum radius is 40k
    const [radius, setRadius] = useState(10000);
    const [page, setPage] = useState(1);
    // can sort by rating, review_count, distance, price, open_now and best_match (Default)
    const [sortType, setSortType] = useState("best_match");
    const { lat, lng } = location;
    const [loading, setLoading] = useState(true);
    const uniqueRestaurants = useMemo(
        () => removeDuplicatesById(restaurants),
        [restaurants]
    );
    const [noMoreRestaurants, setNoMoreRestaurants] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        const fetchedRestaurants = await useFetchRestaurants({
            lat,
            lng,
            cuisine,
            sortType,
            radius,
            offset: (page - 1) * 30,
            limit: 30,
        });

        if (fetchedRestaurants.length === 0) {
            console.log("no more restaurants");
            setLoading(false);
            setNoMoreRestaurants(true);
            return;
        }

        const newRestaurants = fetchedRestaurants.filter(
            (restaurant) => !restaurants.find((r) => r.id === restaurant.id)
        );

        setRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...newRestaurants,
        ]);
        setRenderedIds((prevIds) => [
            ...prevIds,
            ...newRestaurants.map((restaurant) => restaurant.id),
        ]);

        newRestaurants.forEach(async (restaurant) => {
            await fetchRestaurantID(restaurant.id, restaurant.name);
        });

        setLoading(false);
    };

    function removeDuplicatesById(restaurants) {
        const idSet = new Set();
        return restaurants.filter((obj) => {
            if (idSet.has(obj.id)) {
                return false;
            } else {
                idSet.add(obj.id);
                return true;
            }
        });
    }

    // handles the cuisine dropdown option changing
    const handleCuisineChange = (e) => {
        setPage(1);
        setRestaurants([]);
        setCuisine(e.target.value);
        setRenderedIds([]);
        setNoMoreRestaurants(false);
    };

    // handles the sort filter dropdown option changing
    const handleSortChange = (e) => {
        setPage(1);
        setRestaurants([]);
        setSortType(e.target.value);
        setRenderedIds([]);
        setNoMoreRestaurants(false);
    };

    // fully resets both dropdowns and search parameters
    const reset = (e) => {
        e.preventDefault();
        setCuisine("");
        setSortType("best_match");
        setNoMoreRestaurants(false);

        document.getElementById("cuisine-type-select").value = "";
        document.getElementById("sort-type-select").value = "";
    };

    const handleToggle = (newValue) => {
        setSelectedValue(newValue);
    };

    const onRadiusChange = (newRadius) => {
        setRadius(newRadius);
    };

    useEffect(() => {
        console.log("fetching data through dependencies");
        setRestaurants([]);
        setRenderedIds([]);
        fetchData();
    }, [cuisine, sortType, lat, lng, radius]);

    useEffect(() => {
        if (page > 1) {
            console.log("fetching data via page turn", page);
            fetchData();
        }
    }, [page]);

    return (
        <Layout>
            <div className="container">
                <Toggle
                    value1="List View"
                    value2="Map View"
                    selectedValue={selectedValue}
                    handleToggle={handleToggle}
                />
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
                                    <option value={type.key}>
                                        {type.value}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            onChange={handleSortChange}
                            id="sort-type-select"
                        >
                            <option value="" selected disabled>
                                Filter By:
                            </option>
                            {filters.map((type) => {
                                return (
                                    <option value={type.key}>
                                        {type.value}
                                    </option>
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
                {selectedValue == "List View" && !loading && (
                    <RestaurantsList
                        restaurants={uniqueRestaurants}
                        setPage={setPage}
                        loader={loader}
                        noMoreRestaurants={noMoreRestaurants}
                    />
                )}
                {selectedValue == "Map View" && !loading && (
                    <Map
                        restaurants={uniqueRestaurants}
                        setPage={setPage}
                        radius={radius}
                        setRadius={setRadius}
                        reset={reset}
                        location={location}
                        onRadiusChange={onRadiusChange}
                        noMoreRestaurants={noMoreRestaurants}
                        loader={loader}
                    />
                )}
            </div>
            <div className={styles.restaurants} ref={loader}>
                {loading && <Spinner />}
            </div>
        </Layout>
    );
}
