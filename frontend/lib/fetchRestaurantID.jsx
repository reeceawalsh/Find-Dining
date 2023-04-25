import axios from "axios";

export default async function fetchRestaurantID(restaurantID, name) {
    let restaurant;
    let uuid;
    console.log("fetchRestaurantID");
    console.log(restaurantID);
    console.log(name);
    if (restaurantID && name) {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/searchrestaurants?id=${restaurantID}`
            );
            console.log(response);
            if (response.data.length > 0) {
                restaurant = response.data[0];
                uuid = restaurant.id;
                console.log(
                    "response from fetching restaurant id",
                    response.data[0]
                );
                console.log("Restaurant UUID:", uuid);
                return restaurant;
            } else {
                console.log("Creating new restaurant.");
                // need to add the restaurant to the collection
                const createResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/addrestaurant?id=${restaurantID}&name=${name}`
                );
                restaurant = createResponse.data.data[0];
                uuid = createResponse.data.data.id;
                console.log("response", createResponse);
                console.log("Created new restaurant with UUID:", uuid);
                return restaurant;
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    } else {
        console.error("Invalid name or id passed to fetch restaurant id.");
    }
}
