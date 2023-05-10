import axios from "axios";

// this function adds an array of favourites to the users list of favourites. An array is needed because when you update the users list of favourites you must pass all of the favourites, not just one to add. It completely replaces the value in the database.
export default async function addToFavourites(favourites, uuid) {
    console.log("favourites", favourites);
    console.log("user id", uuid);

    const restaurants = favourites.map((restaurant) => restaurant.uuid);

    if (uuid && restaurants) {
        try {
            // sends a put request to the /api/addToFavourites file.
            const response = await axios.put("/api/addToFavourites", {
                uuid: uuid,
                restaurants: restaurants,
            });
            if (response.status === 201) {
                console.log("Added to favourites", response);
            } else if (response.status === 204) {
                console.log("Restaurant not found");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    }
}
