import axios from "axios";

// retrieves specific restaurant information from yelp fusion api
export default async function handler(req, res) {
    const { id } = req.query;
    const token = process.env.YELP_API_KEY;

    if (!id || !token) {
        res.status(400).json({
            message: "Invalid request, missing id or token.",
        });
        return;
    }

    try {
        const response = await axios.get(
            `https://api.yelp.com/v3/businesses/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching restaurant details." });
    }
}
