import axios from "axios";

export default async function fetchRestaurantID(restaurantID, name) {
    let restaurant;
    let uuid;
    if (restaurantID && name) {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/searchrestaurants?id=${restaurantID}`
            );
            if (response.data.length > 0) {
                restaurant = response.data[0];
                uuid = restaurant.id;
                return restaurant;
            } else {
                // need to add the restaurant to the collection
                const createResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/addrestaurant?id=${restaurantID}&name=${name}`
                );
                restaurant = createResponse.data.data[0];
                return restaurant;
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    } else {
        console.error("Invalid name or id passed to fetch restaurant id.");
    }
}
