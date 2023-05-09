import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import styles from "./styles/starRating.module.css";

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <div className={styles.stars}>
            {[...Array(fullStars)].map((_, index) => (
                <FontAwesomeIcon className={styles.individualStarSolid} key={index} icon={faStarSolid} />
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <FontAwesomeIcon className={styles.individualStarEmpty} key={`empty-${index}`} icon={faStarRegular} />
            ))}
        </div>
    );
};

export default StarRating;
