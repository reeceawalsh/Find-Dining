import { useState, useEffect } from "react";

const useFetchNearbyRestaurants = (mapCenter, radius, isLoaded) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        if (!isLoaded || typeof google === "undefined") {
            console.error("Google Maps API is not loaded yet.");
            return;
        }
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
    }, [mapCenter, radius, isLoaded]);

    return restaurants;
};

export default useFetchNearbyRestaurants;
