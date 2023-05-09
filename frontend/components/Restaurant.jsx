import styles from "./styles/restaurant.module.css";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useUser } from "@component/lib/authContext";
import NavLink from "./NavLink";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import fetchRestaurantID from "@component/lib/fetchRestaurantID";
import addToFavourites from "@component/lib/addToFavourites";
import addToHistory from "@component/lib/addToHistory";

// restaurant component which is displayed on the list of restaurants.
const Restaurant = ({
    restaurant,
    favourites = [],
    updateFavourites,
    history = [],
    updateHistory,
}) => {
    const [cookies] = useCookies(["jwt"]);
    const [token, setToken] = useState(null);
    const { user } = useUser();
    const [favourite, setFavourite] = useState();
    const [visited, setVisited] = useState();
    const [clickedFavouriteRestaurant, setClickedFavouriteRestaurant] =
        useState(null);
    const [clickedHistoryRestaurant, setClickedHistoryRestaurant] =
        useState(null);

    /* fetches the restaurant data for the restaurant, if it can't find the restaurant then fetchRestaurantID will add it to the database. This restaurantData will return an object like so
    {createdAt : "2023-04-25T10:59:12.160Z"
     id: 16
     publishedAt:"2023-04-25T10:59:12.155Z"
     restaurantID: "cgHI5wFR-o5k_aWsTpIUVg"
     updatedAt: "2023-04-25T11:48:25.080Z"}
     We only store the yelp restaurant id and the uuid of the restaurant because we can retrieve all of the restaurant information using the yelp restaurant id. This ensures that our information always stays up to date. 
    */
    const getRestaurantData = async () => {
        if (restaurant) {
            const restaurantData = await fetchRestaurantID(
                restaurant.id,
                restaurant.name
            );
            console.log(restaurantData);
            return restaurantData;
        }
    };

    // handles clicking on favourite icon, this handles adding and removing an item from the list of favourites.
    const handleFavouriteClick = async () => {
        const restaurantData = await getRestaurantData();
        // if there's a restaurant and it has an id continue..
        if (restaurantData && restaurant && restaurant.id) {
            // the uuid is our databases unique identifier for the restaurant, not the yelp id.
            let uuid = restaurantData.id;
            // search for the restaurant in the list of favourites
            const tempRestaurant = { uuid: uuid, id: restaurant.id };
            const index = favourites.findIndex(
                (fav) =>
                    fav.uuid === tempRestaurant.uuid &&
                    fav.id === tempRestaurant.id
            );
            let temp;
            // if it found the restaurant then remove it from the list.
            if (index !== -1) {
                temp = [
                    ...favourites.slice(0, index),
                    ...favourites.slice(index + 1),
                ];
            } else {
                // if it's not found then create a new array by spreading the list of favourites and then adding the new restaurants uuid and id. No more information is required for our use.
                temp = [...favourites, { uuid: uuid, id: restaurant.id }];
            }
            // update the list of favourites with the new favourites.
            updateFavourites(temp);
            // set this specific restaurant to be a favourite (this controls the icon being blue (favourited) or not (not favourited))
            setFavourite(!favourite);
            // set the clickedRestaurant as this one's id.
            setClickedFavouriteRestaurant(restaurant.id);
        } else {
            console.log("restaurant data not set yet", restaurantData);
        }
    };

    // this function exhibits the exact same behaviour as above but for history (visited) instead of for favourites.
    const handleVisitedClick = async () => {
        const restaurantData = await getRestaurantData();
        if (restaurantData && restaurant && restaurant.id) {
            let uuid = restaurantData.id;
            const tempRestaurant = { uuid: uuid, id: restaurant.id };
            const index = history.findIndex(
                (hist) =>
                    hist.uuid === tempRestaurant.uuid &&
                    hist.id === tempRestaurant.id
            );
            let temp;
            if (index !== -1) {
                temp = [
                    ...history.slice(0, index),
                    ...history.slice(index + 1),
                ];
            } else {
                temp = [...history, { uuid: uuid, id: restaurant.id }];
            }
            updateHistory(temp);
            setVisited(!visited);
            setClickedHistoryRestaurant(restaurant.id);
        } else {
            console.log("restaurant data not set yet", restaurantData);
        }
    };

    // sets the token when cookies change.
    useEffect(() => {
        setToken(cookies["jwt"]);
    }, [cookies]);

    // if the current restaurant is the one that was clicked, a user is logged in, and the restaurant exists, then add it to favourites. The dependency array ensures it checks each time the favourites, restaurant or clickedRestaurant reports.
    useEffect(() => {
        if (
            user &&
            restaurant &&
            restaurant.id &&
            clickedFavouriteRestaurant === restaurant.id
        ) {
            addToFavourites(favourites, user.id);
        }
        //
        if (restaurant && restaurant.id) {
            // checks if atleast one of the restaurants id's matches this restaurants id.
            setFavourite(favourites.some((fav) => fav.id === restaurant.id));
        }
    }, [favourites, restaurant, clickedFavouriteRestaurant]);

    // same as above but for history.
    useEffect(() => {
        if (
            user &&
            restaurant &&
            restaurant.id &&
            clickedHistoryRestaurant === restaurant.id
        ) {
            addToHistory(history, user.id);
        }
        if (restaurant && restaurant.id) {
            setVisited(history.some((visited) => visited.id === restaurant.id));
        }
    }, [history, user, restaurant, clickedHistoryRestaurant]);

    return (
        <div className={styles.restaurantWrapper}>
            <div className={styles.imageWrapper}>
                {restaurant.image_url ? (
                    <img
                        src={restaurant.image_url}
                        alt={restaurant.name}
                        className={styles.image}
                        width="240"
                        height="240"
                    />
                ) : (
                    <Image
                        className={styles.image}
                        width="240"
                        height="240"
                        src="/LogoCropped.png"
                        alt="Our logo is being used here in place of the restaurants picture as one is not available."
                    />
                )}
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.topWrapper}>
                    <div>
                        <NavLink
                            className={styles.link}
                            href={`/restaurants/${restaurant.name}?id=${restaurant.id}`}
                        >
                            <h2>{restaurant.name}</h2>
                        </NavLink>
                    </div>
                    {user && (
                        <div className={styles.btnWrapper}>
                            {favourite ? (
                                <button
                                    className={
                                        (styles.iconButton, styles.favourited)
                                    }
                                    onClick={handleFavouriteClick}
                                >
                                    <FavoriteIcon />
                                </button>
                            ) : (
                                <button
                                    className={styles.iconButton}
                                    onClick={handleFavouriteClick}
                                >
                                    <FavoriteBorderIcon />
                                </button>
                            )}
                            {visited ? (
                                <button
                                    className={
                                        (styles.iconButton, styles.favourited)
                                    }
                                    onClick={handleVisitedClick}
                                >
                                    <CheckCircleIcon />
                                </button>
                            ) : (
                                <button
                                    className={styles.iconButton}
                                    onClick={handleVisitedClick}
                                >
                                    <CheckCircleIcon />
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <div className={styles.infoSubWrapper}>
                    {restaurant.categories && (
                        <div className={styles.type}>
                            <p>Type:</p>
                            {restaurant.categories.map((category) => {
                                return (
                                    <p key={category.alias}>{category.title}</p>
                                );
                            })}
                        </div>
                    )}
                    {restaurant.rating && (
                        <p>
                            Rating: {restaurant.rating}
                            {restaurant.review_count && (
                                <span>
                                    {" "}
                                    [{restaurant.review_count} reviews]
                                </span>
                            )}
                        </p>
                    )}

                    {restaurant.distance && (
                        <p>
                            Distance away: {Math.round(restaurant.distance)}{" "}
                            meters
                        </p>
                    )}
                    {restaurant.location && (
                        <p>Address: {restaurant.location.address1}</p>
                    )}
                    {restaurant.display_phone && (
                        <p>Phone: {restaurant.display_phone}</p>
                    )}
                    {restaurant.price && <p>Price: {restaurant.price}</p>}
                </div>
                <div className={styles.bottomWrapper}>
                    <Link
                        href={`/restaurants/${restaurant.name}?id=${restaurant.id}`}
                    >
                        <button className={styles.reviewButton}>
                            More Info
                        </button>
                    </Link>
                    <Link
                        href={`/restaurants/${restaurant.name}?id=${restaurant.id}#reviews`}
                    >
                        <button className={styles.reviewButton}>Reviews</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Restaurant;
