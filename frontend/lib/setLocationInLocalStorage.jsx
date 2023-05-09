// sets the users location in localStorage
export default function setLocationInLocalStorage(locationData) {
    localStorage.setItem("currentLocation", JSON.stringify(locationData));
}
