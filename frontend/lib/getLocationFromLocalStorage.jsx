export default function getLocationFromLocalStorage() {
    const locationData = localStorage.getItem("locationData");
    return locationData ? JSON.parse(locationData) : null;
}
