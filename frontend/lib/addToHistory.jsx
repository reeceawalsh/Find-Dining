import axios from "axios";

// this function adds an array of history to the users list of history. An array is needed because when you update the users list of history you must pass all of the history, not just one to add. It completely replaces the value in the database.
export default async function addToHistory(history, uuid) {
    console.log("history", history);
    console.log("user id", uuid);

    const restaurants = history.map((restaurant) => restaurant.uuid);

    if (uuid && history) {
        try {
            // sends a put request to the /api/addToHistory file
            const response = await axios.put("/api/addToHistory", {
                uuid: uuid,
                restaurants: restaurants,
            });
            if (response.status === 201) {
                console.log("Added to visited restaurants", response);
            } else if (response.status === 204) {
                console.log("Restaurant not found");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    }
}
