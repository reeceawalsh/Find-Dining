import axios from "axios";

// fetches the reviews for this restaurant from our backend using the getReviewsByRestaurant function located in the api folder. The function takes a uuid (our unique identifier) to find the restaurant and it's reviews.
export default async function fetchRestaurantReviews(id) {
    if (id) {
        try {
            // fetch reviews
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/getReviewsByRestaurant?id=${id}`
            );
            const reviews = response.data.data.reviews;
            console.log("Reviews for this restaurant:", reviews);
            return reviews;
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    } else {
        console.error("Invalid id passed to fetch restaurant reviews.");
    }
}
