import { createContext, useState, useEffect } from "react";
import fetchUsersCurrentLocation from "./fetchUsersCurrentLocation";

const Location = createContext();

export const LocationProvider = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [searchedLocation, setSearchedLocation] = useState(null);
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const currentLocation = await fetchUsersCurrentLocation();
                setCurrentLocation(currentLocation);
            } catch (error) {
                console.error("Error getting current users location.", error);
            }
        };

        fetchLocation();
    }, []);

    return (
        <Location.Provider
            value={{
                currentLocation,
                setCurrentLocation,
                searchedLocation,
                setSearchedLocation,
            }}
        >
            {children}
        </Location.Provider>
    );
};

export default Location;
export { Location };
