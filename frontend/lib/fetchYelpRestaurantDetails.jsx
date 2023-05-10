import axios from "axios";
// fetches restaurant details about a specific restaurant from yelp.
const fetchYelpRestaurantDetails = async (id) => {
    try {
        const response = await axios.get(`/api/restaurantDetails?id=${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default fetchYelpRestaurantDetails;
