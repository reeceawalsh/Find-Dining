import styles from "./styles/restaurant.module.css";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useUser } from "@component/lib/authContext";
import NavLink from "./NavLink";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { getTokenFromLocalCookie } from "@component/lib/auth";
import { useState, useEffect } from "react";
import addToFavourites from "@component/lib/addToFavourites";
import fetchRestaurantID from "@component/lib/fetchRestaurantID";

const Restaurant = ({ restaurant, uuid, favourites, setFavourites }) => {
    const [cookies] = useCookies(["jwt"]);
    const [token, setToken] = useState(null);
    const { user } = useUser();
    const [favourite, setFavourite] = useState(false);

    const getRestaurantData = async () => {
        const restaurantData = await fetchRestaurantID(
            restaurant.id,
            restaurant.name
        );
        return restaurantData;
    };

    const handleFavoriteClick = async () => {
        const restaurantData = await getRestaurantData();
        if (restaurantData) {
            console.log("working");
            let uuid = restaurantData.id;
            const tempRestaurant = { uuid: uuid, id: restaurant.id };
            const index = favourites.findIndex(
                (fav) =>
                    fav.uuid === tempRestaurant.uuid &&
                    fav.id === tempRestaurant.id
            );
            let temp;
            if (index !== -1) {
                temp = [
                    ...favourites.slice(0, index),
                    ...favourites.slice(index + 1),
                ];
            } else {
                temp = [...favourites, { uuid: uuid, id: restaurant.id }];
            }
            setFavourites(temp);
            setFavourite(!favourite);
        } else {
            console.log("restaurant data not set yet", restaurantData);
        }
    };

    useEffect(() => {
        setToken(getTokenFromLocalCookie(cookies));
    }, [cookies]);

    useEffect(() => {
        if (user) {
            // addToFavourites(favourites, user.id);
        }
        setFavourite(favourites.some((fav) => fav.id === restaurant.id));
    }, [favourites, user, restaurant.id]);

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
                                    onClick={handleFavoriteClick}
                                >
                                    <FavoriteIcon />
                                </button>
                            ) : (
                                <button
                                    className={styles.iconButton}
                                    onClick={handleFavoriteClick}
                                >
                                    <FavoriteBorderIcon />
                                </button>
                            )}
                            <button className={styles.iconButton}>
                                <CheckCircleIcon />
                            </button>
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
                    {restaurant.rating && <p>Rating: {restaurant.rating}</p>}
                    {/* {restaurant.review_count && (
                    <p>Review Count: {restaurant.review_count}</p>
                )} */}
                    {restaurant.distance && (
                        <p>
                            Distance away: {Math.round(restaurant.distance)}{" "}
                            meters
                        </p>
                    )}
                    {restaurant.location.address1 && (
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
