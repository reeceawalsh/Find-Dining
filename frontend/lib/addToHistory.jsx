import axios from "axios";

export default async function addToHistory(history, uuid) {
    console.log("history", history);
    console.log("user id", uuid);
    const restaurants = history.map((restaurant) => restaurant.uuid);

    if (uuid && history) {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/addToHistory`,
                {
                    uuid: uuid,
                    restaurants: restaurants,
                }
            );
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
