import { useState, useEffect } from "react";

const useFetchNearbyRestaurants = (mapCenter, radius) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const request = {
            location: mapCenter,
            radius: radius,
            type: ["restaurant"],
        };

        const service = new google.maps.places.PlacesService(
            document.createElement("div")
        );

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                setRestaurants(results);
                console.log("Restaurants:", results);
            } else {
                console.error("Error fetching nearby restaurants:", status);
            }
        });
    }, [mapCenter, radius]);

    return restaurants;
};

export default useFetchNearbyRestaurants;
