const Location = createContext({ lat: 54.9783, lng: -1.61396 });

export const locationProvider = () => {
    const setLocation = (value) => {
        console.log("Default function:", value);
    };
};

export const useLocation = () => useContext(Location);
