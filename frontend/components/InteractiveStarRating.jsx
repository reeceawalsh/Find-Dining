// InteractiveStarRating.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStarHalf as faStarHalfSolid } from "@fortawesome/free-solid-svg-icons";
import { faStarHalf as faStarHalfRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import styles from "./styles/interactiveStarRating.module.css";

const InteractiveStarRating = ({ onRatingChange }) => {
    const [selectedRating, setSelectedRating] = useState(0);

    const handleStarClick = (starIndex, isHalf) => {
        const newRating = isHalf ? starIndex + 0.5 : starIndex + 1;
        setSelectedRating(newRating);
        onRatingChange(newRating);
    };

    return (
        <div className={styles.stars}>
            {[...Array(5)].map((_, index) => {
                const isFull = index < Math.floor(selectedRating);
                const isHalf = index + 0.5 === selectedRating;

                return (
                    <div
                        key={index}
                        className={styles.starWrapper}
                        onClick={(e) => {
                            const rect = e.target.getBoundingClientRect();
                            const isHalf =
                                e.clientX - rect.left < rect.width / 2;
                            handleStarClick(index, isHalf);
                        }}
                    >
                        {isFull ? (
                            <FontAwesomeIcon icon={faStarSolid} />
                        ) : isHalf ? (
                            <>
                                <FontAwesomeIcon icon={faStarHalfSolid} />
                                <span className={styles.starOutline}>
                                    <FontAwesomeIcon icon={faStarHalfRegular} />
                                </span>
                            </>
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
