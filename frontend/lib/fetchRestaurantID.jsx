import axios from "axios";

// this function takes a restaurantID and a restaurant name. This function searches our database and attempts to retrieve the restaurants uuid (the uuid in this case is our specific unique identifier) (the restaurantID is the yelp restaurant identifier). If it cannot find the restaurant, it will add the restaurant to our colleciton.
export default async function fetchRestaurantID(restaurantID, name) {
    let restaurant;
    let uuid;
    if (restaurantID && name) {
        try {
            const response = await axios.get(
                `/api/searchrestaurants?id=${restaurantID}`
            );
            if (response.data.length > 0) {
                restaurant = response.data[0];
                uuid = restaurant.id;
                return restaurant;
            } else {
                // need to add the restaurant to the collection
                const createResponse = await axios.post(
                    `/api/addrestaurant?id=${restaurantID}&name=${name}`
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
