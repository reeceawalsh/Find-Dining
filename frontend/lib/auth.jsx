import axios from "axios";

// gets the token from cookies
export const getTokenFromLocalCookie = (cookies) => {
    return cookies["jwt"];
};

// retrieves the user data using the jwt token from local cookies.
export const getUserFromLocalCookie = async (cookies) => {
    const jwt = cookies.jwt;
    if (jwt) {
        console.log("JWT token in getUserFromLocalCookie:", jwt);
        try {
            const response = await axios.get("/api/user", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });

            const data = response.data;

            if (data.error) {
                console.error(data.error);
                return;
            }

            data.jwt = jwt;
            return data;
        } catch (err) {
            return console.error(err);
        }
    } else {
        return;
    }
};

export const getTokenFromServerCookie = (req) => {
    if (!req.headers.cookie) return undefined;
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
    if (!req.headers.cookie) return undefined;
    const idCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("id="));
    if (!idCookie) return undefined;
    const id = idCookie.split("=")[1];
    return id;
};
