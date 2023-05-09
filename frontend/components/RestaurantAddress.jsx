import styles from "./styles/restaurantAddress.module.css";
const RestaurantAddress = ({ location }) => {
    const { address1, city, zip_code } = location;
    return (
        <div className={styles.container}>
            <p>{address1}</p>
            <p>{city}</p>
            <p>{zip_code}</p>
        </div>
    );
};

export default RestaurantAddress;
