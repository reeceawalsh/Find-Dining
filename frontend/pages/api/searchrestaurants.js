import axios from "axios";

// searches for restaurants with an id that matches the passed in id.
export default async function handler(req, res) {
    console.log("Search Restaurants");
    if (req.method === "GET") {
        const { id } = req.query;

        try {
            const response = await axios.get(
                // this will return the data for restaurants with the id of {id}. this is the yelp id (not the uuid)
                `${process.env.STRAPI_URL}/restaurants?filters[restaurantID][$eq]=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                    },
                }
            );

            if (response.data.data.length > 0) {
                res.status(200).json(response.data.data);
            } else {
                res.status(204).json({ message: "No restaurant found" });
            }
        } catch (error) {
            console.error("Error in searchrestaurant.js:", error);
            res.status(500).json({
                message: "An error occurred whilst searching for a restaurant.",
            });
        }
    }
}
