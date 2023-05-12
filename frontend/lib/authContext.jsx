import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie } from "./auth";
import { useCookies } from "react-cookie";

import useUnsetToken from "./useUnsetToken";
import useForceUpdate from "@component/lib/useForceUpdate.jsx";
import { useRouter } from "next/router";

// create context for User
const User = createContext({ user: null, loading: false });

// this user provider keeps track of the
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
    const router = useRouter();
    const unsetToken = useUnsetToken();

    // forces a re-render when required
    const forceUpdate = useForceUpdate();

    // fetches the user if there's a jwt token.
    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUserFromLocalCookie(cookies);
            setUser(fetchedUser);
            console.log(user);
            setLoading(false);
        };
        if (cookies.jwt) {
            fetchUser();
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [cookies.jwt]);

    // logs the user out and routes them to the home page
    const logout = () => {
        unsetToken();
        setUser(null);
        router.push("/home");
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
