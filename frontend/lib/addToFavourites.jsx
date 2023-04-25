import axios from "axios";

export default async function addToFavourites(favourites, uuid) {
    console.log("favourites", favourites);
    console.log("user id", uuid);
    // need to change the favourites into an array with only the uuid's of the restaurants
    const restaurants = favourites.map((restaurant) => restaurant.uuid);
    console.log(restaurants);
    if (uuid && restaurants) {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/addToFavourites`,
                {
                    uuid: uuid,
                    restaurants: restaurants,
                }
            );
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
