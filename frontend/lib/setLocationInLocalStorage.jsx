export default function setLocationInLocalStorage(locationData) {
    localStorage.setItem("currentLocation", JSON.stringify(locationData));
}
