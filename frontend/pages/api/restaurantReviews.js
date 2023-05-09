import axios from "axios";

// Not currently in use as it only returns three reviews.
// gets yelp reviews from yelp about a specific restaurant id
export default async function handler(req, res) {
    const { id, token } = req.query;

    if (!id || !token) {
        res.status(400).json({
            message: "Invalid request, missing id or token.",
        });
        return;
    }

    try {
        const response = await axios.get(
            `https://api.yelp.com/v3/businesses/${id}/reviews`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching restaurant reviews." });
    }
}
