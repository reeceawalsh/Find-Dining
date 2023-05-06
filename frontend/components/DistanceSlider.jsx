import styles from "./styles/map.module.css";

// distance slider which allows the user to increase or decrease the search radius, used by RestaurantList and Map but rendered in the restaurants parent page.
const DistanceSlider = ({ radius, onRadiusChange }) => {
    return (
        <div className={styles.sliderWrapper}>
            <p>Radius: {(radius / 1000).toFixed(1)} km</p>
            <input
                type="range"
                min="100"
                max="10000"
                value={radius}
                onChange={(e) => onRadiusChange(parseInt(e.target.value, 10))}
                className={styles.slider}
            />
        </div>
    );
};

export default DistanceSlider;
