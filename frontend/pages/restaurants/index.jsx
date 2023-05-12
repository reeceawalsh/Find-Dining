import { useState, useRef, useEffect, useMemo, useContext } from "react";
import Layout from "@component/components/Layout";
import Location from "@component/lib/locationContext";
import RestaurantsList from "@component/components/RestaurantsList";
import Toggle from "@component/components/FormElements/Toggle";
import Map from "@component/components/Map";
import useFetchRestaurants from "@component/lib/useFetchRestaurants";
import fetchRestaurantID from "@component/lib/fetchRestaurantID";
import cuisines from "../../lib/cuisines.json";
import filters from "../../lib/filters.json";
import styles from "./restaurants.module.css";
import Spinner from "@component/components/Spinner";
import DistanceSlider from "@component/components/DistanceSlider";

// route -> /restaurants
// it's important to have all of the following logic such as radius changes, cuisine changes etc. in this parent component so that our list of restaurants stays consistent between list view and map view.
export default function Restaurants() {
    const loader = useRef(null);
    // this can change between List View and Map View
    const [selectedValue, setSelectedValue] = useState("List View");
    const { location } = useContext(Location);
    const { lat, lng } = location;
    // cuisine keeps track of what cuisine the user is searching for
    const [cuisine, setCuisine] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    // Yelps maximum radius is 40k
    const [radius, setRadius] = useState(10000);
    const [page, setPage] = useState(1);
    // can sort by rating, review_count, distance, price, open_now and best_match (Default)
    const [sortType, setSortType] = useState("best_match");
    const [loading, setLoading] = useState(true);
    console.log(restaurants);
    // maintains a list of unique restaurants, the issue with yelp is that they have multiple duplicate restaurants so they need to be filtered through.
    const uniqueRestaurants = useMemo(
        () => removeDuplicatesById(restaurants),
        [restaurants]
    );

    // if there are no more restaurants we want to display a message.
    const [noMoreRestaurants, setNoMoreRestaurants] = useState(false);

    // fetches restaurant data using those parameters
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
            is_closed: false,
        });

        // if there are less than 30 restaurants then we need to tell the user theres no more restaurants so we don't attempt to fetch more restaurants and the user doesn't expect more.
        if (fetchedRestaurants.length < 30) {
            console.log("no more restaurants");
            setLoading(false);
            setNoMoreRestaurants(true);
        }

        // new restaurants ensure the restaurants don't already exist in our array of restaurants
        const newRestaurants = fetchedRestaurants.filter(
            (restaurant) => !restaurants.find((r) => r.id === restaurant.id)
        );

        // set the restaurants to equal our previous restaurants plus the new filtered restaurants
        setRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...newRestaurants,
        ]);

        // for every restaurant that we get, it will fetch the restaurantID (our unique uuid that every restaurant in our database has), if it cannot find the restaurantID it will add them to the database, this functionality is contained within fetchRestaurantID. we need the restaurants in our database for reviews, favourites and history. doing it at this point ensures no delays, rather than doing it at another point.
        newRestaurants.forEach(async (restaurant) => {
            await fetchRestaurantID(restaurant.id, restaurant.name);
        });

        // set loading to false as the new restaurants have been loaded in.
        setLoading(false);
    };

    // creates a set of ids then filters through and ensures that the restaurants don't have multiple ids, this is extra sanitisation to ensure no duplicates have got through.
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
        setNoMoreRestaurants(false);
    };

    // handles the sort filter dropdown option changing
    const handleSortChange = (e) => {
        setPage(1);
        setRestaurants([]);
        setSortType(e.target.value);
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

    // handles toggle between map view and list view
    const handleToggle = (newValue) => {
        setSelectedValue(newValue);
    };

    // handles radius changes
    const onRadiusChange = (newRadius) => {
        setRadius(newRadius);
    };

    // wipes the list of restaurants then fetches new data, the dependency array ensures this useEffect runs when of the array changes. it's important they change because the user wants different restaurants.
    useEffect(() => {
        console.log("fetching data through dependencies");
        setRestaurants([]);
        fetchData();
    }, [cuisine, sortType, lat, lng, radius]);

    // will load more restaurants but not wipe the restaurants data because this is dependent on page turn.
    useEffect(() => {
        if (page > 1) {
            console.log("fetching data via page turn", page);
            fetchData();
        }
    }, [page]);

    return (
        <Layout>
            <div className={`container`}>
                <Toggle
                    value1="List View"
                    value2="Map View"
                    selectedValue={selectedValue}
                    handleToggle={handleToggle}
                />
                <div className={styles.top}>
                    <div className={styles.slider}>
                        <DistanceSlider
                            radius={radius}
                            onRadiusChange={(newRadius) => {
                                setRadius(newRadius);
                                onRadiusChange(newRadius);
                            }}
                        />
                    </div>
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
