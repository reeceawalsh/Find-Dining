import axios from "axios";

// this function fetches an array of the user's favourite restaurants
export default async function fetchFavouriteRestaurants(id) {
    if (id) {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/getUserData?id=${id}`
            );
            return response.data.restaurants;
        } catch (error) {
            console.error(error.message);
        }
    }
}
