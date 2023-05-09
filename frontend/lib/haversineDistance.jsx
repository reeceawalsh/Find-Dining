const toRadians = (degrees) => (degrees * Math.PI) / 180;

// calculates the distance from the location based in, to the restaurants location by using an algorithm called haversineDistance. https://en.wikipedia.org/wiki/Haversine_formula#:~:text=The%20haversine%20formula%20determines%20the,and%20angles%20of%20spherical%20triangles.
const haversineDistance = (restaurantLat, restaurantLng, geoLocation) => {
    if (geoLocation) {
        const R = 6371e3; // Earth's radius in meters
        const phi1 = toRadians(geoLocation.lat);
        const phi2 = toRadians(restaurantLat);
        const deltaPhi = toRadians(restaurantLat - geoLocation.lat);
        const deltaLambda = toRadians(restaurantLng - geoLocation.lng);

        const a =
            Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) *
                Math.cos(phi2) *
                Math.sin(deltaLambda / 2) *
                Math.sin(deltaLambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
};

export default haversineDistance;
