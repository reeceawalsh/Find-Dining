import axios from "axios";

// adds a review to the users reviews.
// Strapi uses Object-Relational Mapping and the Knex.js library as a query builder, which provides protection against SQL injection attacks, so there is no need to sanitize data sent to the backend.
export default async function handler(req, res) {
    console.log("handler");
    if (req.method === "POST") {
        const { review, Restaurant, reviewer, rating } = req.body;
        console.log(req);
        try {
            const response = await axios.post(
                `${process.env.STRAPI_URL}/reviews?populate=*`,
                {
                    data: {
                        review,
                        Restaurant,
                        reviewer,
                        rating,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            res.status(201).json(response.data);
        } catch (error) {
            res.status(error.response.status || 500).json({
                message: "An error occurred",
                error: error.response.data,
            });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
