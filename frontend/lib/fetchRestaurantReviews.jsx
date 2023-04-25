import axios from "axios";

export default async function fetchRestaurantReviews(id) {
    if (id) {
        try {
            // fetch reviews
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/getReviewsByRestaurant?id=${id}`
            );
            console.log(response);

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
