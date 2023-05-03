import axios from "axios";

const useFetchRestaurants = async ({
    lat,
    lng,
    cuisine,
    sortType,
    radius,
    offset,
    limit,
}) => {
    try {
        const response = await axios.get("/api/yelp", {
            params: {
                latitude: lat,
                longitude: lng,
                term: cuisine,
                sort_by: sortType,
                radius: radius,
                offset: offset,
                limit: limit,
            },
        });

        return response.data.businesses;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export default useFetchRestaurants;
