import { createClient } from "@google/maps";

// pulls in google maps data
const googleMapsClient = createClient({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    Promise: Promise,
});

export default async function handler(req, res) {
    const { location, cuisine, sortType } = req.query;
    console.log(location);
    try {
        const response = await googleMapsClient
            .placesNearby({
                language: "en",
                location: location,
                radius: 1000, // Specify a search radius in meters (up to 50,000 meters)
                type: "restaurant", // Search for restaurants
                keyword: cuisine, // Filter by cuisine
                opennow: true, // Only return places that are currently open
                rankby: sortType === "distance" ? "distance" : "prominence", // Sort by distance or prominence
            })
            .asPromise();

        const restaurants = response.json.results;
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching Google Maps data:", error);
        res.status(500).json({
            message: "Error fetching Google Maps data",
            error: error.message,
            stack: error.stack,
        });
    }
}
