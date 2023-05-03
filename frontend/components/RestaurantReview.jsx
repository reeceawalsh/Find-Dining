import StarRating from "./StarRating";
import styles from "./styles/review.module.css";
import formatDate from "@component/lib/formatData";
import { useState } from "react";
export default function RestaurantReview({ review }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={styles.container}>
            <p className={styles.username}>{review.reviewer}</p>
            <StarRating rating={review.rating} />
            <p className={styles.text}>
                {review.review.length > 500 && !isExpanded
                    ? review.review.slice(0, 500) + "..."
                    : review.review}
            </p>
            {review.review.length > 500 && (
                <button
                    className={styles.toggleButton}
                    onClick={toggleExpanded}
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            )}

            <p>{formatDate(review.createdAt)}</p>
        </div>
    );
}
