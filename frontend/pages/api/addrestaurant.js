import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id, name } = req.query;

        console.log(id);
        console.log(name);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/restaurants`,
                {
                    data: {
                        restaurantID: id,
                        name,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
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
