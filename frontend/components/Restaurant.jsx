import styles from "./styles/restaurant.module.css";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useUser } from "@component/lib/authContext";

const Restaurant = ({ restaurant }) => {
    const { user } = useUser();
    return (
        <div className={styles.restaurantWrapper}>
            <div className={styles.imageWrapper}>
                {restaurant.image_url ? (
                    <img
                        src={restaurant.image_url}
                        alt={restaurant.name}
                        width="240"
                        height="240"
                    />
                ) : (
                    <Image
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
                        <h2 className={styles.restaurantName}>
                            {restaurant.name}
                        </h2>
                    </div>
                    {user && (
                        <div className={styles.btnWrapper}>
                            <button className={styles.iconButton}>
                                <FavoriteIcon />
                            </button>
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
                    <button className={styles.reviewButton}>
                        Read Reviews
                    </button>
                    {user && (
                        <button className={styles.reviewButton}>
                            Leave Review
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Restaurant;
