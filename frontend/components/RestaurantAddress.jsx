import styles from "./styles/restaurantAddress.module.css";
// handles formatting restaurant address by taking a location object and returning it as an address1, city and post code.
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
