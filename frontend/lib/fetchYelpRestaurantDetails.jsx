import axios from "axios";
// fetches restaurant details about a specific restaurant from yelp.
const fetchYelpRestaurantDetails = async (id) => {
    const token = process.env.NEXT_PUBLIC_YELP_API_KEY;
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurantDetails?id=${id}&token=${token}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default fetchYelpRestaurantDetails;
