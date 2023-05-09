import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import styles from "./styles/interactiveStarRating.module.css";

// this component renders five empty stars which can be clicked to fill the appropriate amount of stars. Clicking the third star will fill the first three stars.
const InteractiveStarRating = ({ onRatingChange }) => {
    // setting the iniital rating to 0 ensures an empty set of stars.
    const [selectedRating, setSelectedRating] = useState(0);
    // increases the rating to equal whichever star was pressed.
    const handleStarClick = (starIndex) => {
        // + 1 to account for zero indexing
        const newRating = starIndex + 1;
        setSelectedRating(newRating);
        onRatingChange(newRating);
    };

    return (
        <div className={styles.stars}>
            {/* creates an array of five elements, we don't access the element so it's represented by an underscore. isFull will fill in the star if the selected index is greater than the index of the star. This logic ensures that all previous stars get filled in when for example the fourth star is clicked (4/5 stars). */}
            {[...Array(5)].map((_, index) => {
                const isFull = index < Math.floor(selectedRating);
                return (
                    <div
                        key={index}
                        className={styles.starWrapper}
                        onClick={(e) => {
                            handleStarClick(index);
                        }}
                    >
                        {isFull ? (
                            <FontAwesomeIcon
                                icon={faStarSolid}
                                className={styles.individualStarSolid}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faStarRegular}
                                className={styles.individualStarEmpty}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default InteractiveStarRating;
