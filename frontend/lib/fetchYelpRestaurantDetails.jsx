import axios from "axios";
const fetchYelpRestaurantDetails = async (id, token) => {
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
