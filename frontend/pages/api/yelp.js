import axios from "axios";

// gets a lot of restaurants with the params passed in from the helper function.
export default async function handler(req, res) {
    const { term, sort_by, radius, offset, limit, is_closed } = req.query;
    const latitude = req.query.latitude || 54.9783;
    const longitude = req.query.longitude || -1.61396;

    try {
        const response = await axios.get(
            "https://api.yelp.com/v3/businesses/search",
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
                },
                params: {
                    latitude,
                    longitude,
                    term: term,
                    sort_by: sort_by,
                    radius: radius,
                    offset: offset,
                    limit: limit,
                    is_closed,
                    is_closed,
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
