import styles from "./styles/restaurant.module.css";
const Restaurant = ({ restaurant }) => {
    return (
        <div className={styles.restaurantWrapper}>
            <h2 className={styles.restaurantName}>{restaurant.name}</h2>
            {/* <img
                src={restaurant.image_url}
                alt={restaurant.name}
                width="240"
                height="240"
            /> */}
            <div className={styles.restaurantInformation}>
                {restaurant.rating && <p>Rating: {restaurant.rating}</p>}
                {/* {restaurant.review_count && (
                    <p>Review Count: {restaurant.review_count}</p>
                )} */}
                {restaurant.distance && (
                    <p>
                        Distance away: {Math.round(restaurant.distance)} meters
                    </p>
                )}
                {restaurant.location.address1 && (
                    <p>Address: {restaurant.location.address1}</p>
                )}
                {restaurant.display_phone && (
                    <p>Phone: {restaurant.display_phone}</p>
                )}
                {restaurant.price && <p>Price: {restaurant.price}</p>}
                <p>Favourite Icon</p>
                <p>Visited Icon</p>
            </div>
        </div>
    );
};

export default Restaurant;
