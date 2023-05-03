import { createContext, useState, useEffect } from "react";
import fetchUsersCurrentLocation from "./fetchUsersCurrentLocation";

const Location = createContext();

export const LocationProvider = ({ children }) => {
    const [geoLocation, setGeoLocation] = useState(null);
    const [location, setLocation] = useState({ lat: 54.9783, lng: -1.61396 });
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const currentLocation = await fetchUsersCurrentLocation();
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
