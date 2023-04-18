import styles from "./styles/restaurant.module.css";
const Restaurant = ({ restaurant }) => {
    console.log(restaurant);
    return (
        <div className={styles.restaurantWrapper}>
            <h2>{restaurant.name}</h2>
            <img
                src={restaurant.image_url}
                alt={restaurant.name}
                width="240"
                height="240"
            />
            <div className={styles.restaurantInformation}>
                <p>Rating: {restaurant.rating}</p>
                <p>Review Count: {restaurant.review_count}</p>
                <p>Distance: {Math.round(restaurant.distance)} meters</p>
                <p>Address: {restaurant.location.address1}</p>
                <p>Phone: {restaurant.display_phone}</p>
                <p>Price: {restaurant.price}</p>
            </div>
        </div>
    );
};

export default Restaurant;
