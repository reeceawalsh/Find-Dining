import { fetcher } from "./api";

export const setToken = (data, setCookie) => {
    setCookie("jwt", data.jwt, { path: "/" });
    setCookie("username", data.user.username, { path: "/" });
};
export const unsetToken = (removeCookie) => {
    if (typeof window === "undefined") return;

    removeCookie("jwt", { path: "/" });
    removeCookie("id", { path: "/" });
    removeCookie("username", { path: "/" });
};

export const getTokenFromLocalCookie = (cookies) => {
    return cookies["jwt"];
};
export const getUserFromLocalCookie = async (cookies) => {
    const jwt = getTokenFromLocalCookie(cookies);
    if (jwt) {
        try {
            const data = await fetcher(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            if (data.error) {
                console.error(data.error);
                return;
            }

            data.jwt = jwt; // Add the jwt property to the returned user object
            return data;
        } catch (err) {
            return console.error(err);
        }
    } else {
        return;
    }
};

export const getIdFromLocalCookie = async (cookies) => {
    const jwt = getTokenFromLocalCookie(cookies);
    if (jwt) {
        const data = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        return data.id;
    } else {
        return;
    }
};

export const getTokenFromServerCookie = (req) => {
    if (!req.headers.cookie || "") return undefined;
    const jwtCookie = req.headers.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("jwt="));
    if (!jwtCookie) {
        return undefined;
    }
    const jwt = jwtCookie.split("=")[1];
    return jwt;
};

export const getIdFromServerCookie = (req) => {
    if (!req.headers.cookie || "") return undefined;
    const idCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("id="));
    if (!idCookie) return undefined;
    const id = idCookie.split("=")[1];
    return id;
};
