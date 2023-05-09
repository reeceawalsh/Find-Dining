import axios from "axios";

// adds a review to the users reviews.
export default async function handler(req, res) {
    if (req.method === "GET") {
        const { review, Restaurant, User, rating, reviewer } = req.query;
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews?populate=*`,
                {
                    data: {
                        review,
                        Restaurant,
                        User,
                        reviewer,
                        rating,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
