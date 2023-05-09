import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import styles from "./styles/starRating.module.css";

// this star rating component is used multiple times through the code, mostly on the RestaurantPage. It doesn't display half stars, but rounds to the closest whole number if the rating is a float.
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <div className={styles.stars}>
            {/* Creates an array based on the rounded up rating and maps through the array adding a full star. The array will always be the size of fullStars. */}
            {[...Array(fullStars)].map((_, index) => (
                <FontAwesomeIcon
                    className={styles.individualStarSolid}
                    key={index}
                    icon={faStarSolid}
                />
            ))}
            {/* Creates an array based on 5 minus the rounded up rating i.e. the left over empty stars. For each place it will render an empty star icon.*/}
            {[...Array(emptyStars)].map((_, index) => (
                <FontAwesomeIcon
                    className={styles.individualStarEmpty}
                    key={`empty-${index}`}
                    icon={faStarRegular}
                />
            ))}
        </div>
    );
};

export default StarRating;
