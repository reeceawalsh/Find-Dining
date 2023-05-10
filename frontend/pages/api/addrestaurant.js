import axios from "axios";

// handles adding a restaurant to the database, takes a yelp id and a name.
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id, name } = req.query;

        console.log(id);
        console.log(name);

        try {
            const response = await axios.post(
                `${process.env.STRAPI_URL}/restaurants`,
                {
                    data: {
                        restaurantID: id,
                        name,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error in addRestaurant.js:", error);
            console.error("Error response:", error.response);
            console.error("Error response data:", error.response?.data);
            res.status(500).json({
                error: "An error occurred whilst adding a restaurant.",
            });
        }
    }
}
