import StarRating from "./StarRating";
import styles from "./styles/review.module.css";
import formatDate from "@component/lib/formatData";
export default function RestaurantReview({ review }) {
    return (
        <div className={styles.container}>
            <p className={styles.username}>{review.reviewer}</p>
            <StarRating rating={review.rating} />
            <p className={styles.text}>{review.review}</p>
            <p>{formatDate(review.createdAt)}</p>
        </div>
    );
}
