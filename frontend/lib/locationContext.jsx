import { createContext, useState } from "react";

const Location = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState({ lat: 54.9783, lng: -1.61396 });

    return (
        <Location.Provider value={{ location, setLocation }}>
            {children}
        </Location.Provider>
    );
};

export default Location;
export { Location };
