// retrieves the users location from local storage if required
// this was mainly used before I created the location context provider.
export default function getLocationFromLocalStorage() {
    const locationData = localStorage.getItem("locationData");
    return locationData ? JSON.parse(locationData) : null;
}
