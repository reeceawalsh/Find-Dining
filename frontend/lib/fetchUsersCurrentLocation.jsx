import setLocationInLocalStorage from "./setLocationInLocalStorage";
// retrieves the users current geoLocation using navigator (a geoLocation wbe browser api).
export default function fetchUsersCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const locationData = { lat: latitude, lng: longitude };
                // set the location is local storage and then resolve the promise.
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
