import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie } from "./auth";
import { useCookies } from "react-cookie";
import { unsetToken } from "./auth";
import useForceUpdate from "@component/lib/useForceUpdate.jsx";

const User = createContext({ user: null, loading: false });

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

    const forceUpdate = useForceUpdate(); // Add this line

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUserFromLocalCookie(cookies);
            setUser(fetchedUser);
            setLoading(false);
        };

        if (cookies.jwt) {
            fetchUser();
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [cookies.jwt]);

    const logout = () => {
        unsetToken(removeCookie);
        setUser(null);
    };

    return (
        <User.Provider
            value={{
                user,
                loading,
                setUser: (newUser) => {
                    setUser(newUser);
                    forceUpdate(); // Force an update when the user state changes
                },
                logout,
            }}
        >
            {children}
        </User.Provider>
    );
};

export const useUser = () => useContext(User);
