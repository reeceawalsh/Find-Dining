import axios from "axios";

// NOT IN USE
// fetches restaurant reviews about a specific restaurant, only returns 3 reviews an they're not complete so it's not in use at this moment in time.
const fetchYelpRestaurantReviews = async (id) => {
    try {
        const response = await axios.get(`/api/restaurantReviews?id=${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default fetchYelpRestaurantReviews;
