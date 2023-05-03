// InteractiveStarRating.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import styles from "./styles/interactiveStarRating.module.css";

const InteractiveStarRating = ({ onRatingChange }) => {
    const [selectedRating, setSelectedRating] = useState(0);

    const handleStarClick = (starIndex, isHalf) => {
        const newRating = starIndex + 1;
        setSelectedRating(newRating);
        onRatingChange(newRating);
    };

    return (
        <div className={styles.stars}>
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
                            <FontAwesomeIcon icon={faStarSolid} />
                        ) : (
                            <FontAwesomeIcon icon={faStarRegular} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default InteractiveStarRating;
