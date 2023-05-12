import axios from "axios";

// fetches restaurants from yelp using certain search criteria which will change based on filters, radius and sort type as defined by the user.
const useFetchRestaurants = async ({
    lat,
    lng,
    cuisine,
    sortType,
    radius,
    offset,
    limit,
    is_closed,
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
                is_closed: is_closed,
            },
        });

        return response.data.businesses;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export default useFetchRestaurants;
