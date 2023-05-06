const toRadians = (degrees) => (degrees * Math.PI) / 180;

const haversineDistance = (
    locationLat,
    locationLng,
    restaurantLat,
    restaurantLng
) => {
    const R = 6371e3; // Earth's radius in meters
    const phi1 = toRadians(locationLat);
    const phi2 = toRadians(restaurantLat);
    const deltaPhi = toRadians(restaurantLat - locationLat);
    const deltaLambda = toRadians(restaurantLng - locationLng);

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
