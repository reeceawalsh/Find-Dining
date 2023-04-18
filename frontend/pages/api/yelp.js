import axios from "axios";

export default async function handler(req, res) {
    const { latitude, longitude, cuisine, sortType } = req.query;
    // const latitude = req.query.latitude || 54.9783;
    // const longitude = req.query.longitude || -1.61396;

    try {
        const response = await axios.get(
            "https://api.yelp.com/v3/businesses/search",
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`,
                },
                params: {
                    latitude,
                    longitude,
                    categories: cuisine,
                    sort_by: sortType,
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching Yelp data:", error.message); //
        res.status(500).json({
            message: "Error fetching Yelp data",
            error: error.message,
            stack: error.stack,
        });
    }
}
