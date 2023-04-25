const toRadians = (degrees) => (degrees * Math.PI) / 180;

const haversineDistance = (restaurantLat, restaurantLng) => {
    const location = JSON.parse(localStorage.getItem("location"));
    const userLat = location.lat;
    const userLng = location.lng;

    const R = 6371e3; // Earth's radius in meters
    const phi1 = toRadians(userLat);
    const phi2 = toRadians(restaurantLat);
    const deltaPhi = toRadians(restaurantLat - userLat);
    const deltaLambda = toRadians(restaurantLng - userLng);

    const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) *
            Math.cos(phi2) *
            Math.sin(deltaLambda / 2) *
            Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export default haversineDistance;
