import StarRating from "./StarRating";
import styles from "./styles/review.module.css";
import formatDate from "@component/lib/formatData";
import { useState } from "react";
// restaurant review component for an individual review, these reviews are found on the RestaurantPage.
export default function RestaurantReview({ review }) {
    // controls whether the review is expanded or not (long reviews are made smaller and bigger via a button)
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={styles.container}>
            <p className={styles.username}>{review.reviewer}</p>
            <div className={styles.ratingWrapper}>
                <StarRating rating={review.rating} />
            </div>
            {/* if the review length is longer than 500 characters, it slices it and adds ... */}
            <p className={styles.text}>
                {review.review.length > 500 && !isExpanded
                    ? review.review.slice(0, 500) + "..."
                    : review.review}
            </p>
            {/* only shows this button if the review is longer than 500 characters, the onclick will make it longer or shorter */}
            {review.review.length > 500 && (
                <button
                    className={styles.toggleButton}
                    onClick={toggleExpanded}
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            )}
            {/* takes the long format date and returns a formatted date e.g. 09-05-2023 14:38 */}
            <p>{formatDate(review.createdAt)}</p>
        </div>
    );
}
