import axios from "axios";

// NOT IN USE
// fetches restaurant reviews about a specific restaurant, only returns 3 reviews an they're not complete so it's not in use at this moment in time.
const fetchYelpRestaurantReviews = async (id) => {
    const token = process.env.NEXT_PUBLIC_YELP_API_KEY;
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurantReviews?id=${id}&token=${token}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default fetchYelpRestaurantReviews;
