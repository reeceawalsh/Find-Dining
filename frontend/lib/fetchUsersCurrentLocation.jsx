import getLocationFromLocalStorage from "./getLocationFromLocalStorage";
import setLocationInLocalStorage from "./setLocationInLocalStorage";
export default function fetchUsersCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const locationData = { lat: latitude, lng: longitude };
                setLocationInLocalStorage(locationData);
                resolve(locationData);
            },
            (error) => {
                reject(error);
            },
            { timeout: 10000 }
        );
    });
}
