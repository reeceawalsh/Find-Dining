import { createContext, useState, useEffect } from "react";
import fetchUsersCurrentLocation from "./fetchUsersCurrentLocation";

// create location context
const Location = createContext();

// location provider wraps around _app.js, providing access everywhere.
export const LocationProvider = ({ children }) => {
    const [geoLocation, setGeoLocation] = useState(null);
    // sets the default location as Newcastle as it's a Newcastle based application
    const [location, setLocation] = useState({ lat: 54.9783, lng: -1.61396 });

    // fetches the users location using helper functions.
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const currentLocation = await fetchUsersCurrentLocation();
                console.log(currentLocation);
                setGeoLocation(currentLocation);
            } catch (error) {
                console.error("Error getting current users location.", error);
            }
        };

        fetchLocation();
    }, []);

    return (
        <Location.Provider
            value={{
                geoLocation,
                setGeoLocation,
                setLocation,
                location,
            }}
        >
            {children}
        </Location.Provider>
    );
};

export default Location;
export { Location };
