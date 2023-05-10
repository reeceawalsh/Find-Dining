import axios from "axios";

export default async function handler(req, res) {
    console.log(req);
    console.log(res);
    if (req.method == "GET") {
        // retrieve user info
        try {
            const jwt = req.headers.authorization.split(" ")[1];
            console.log("JWT token in API route handler:", jwt);
            const response = await axios.get(
                `${process.env.STRAPI_URL}/users/me`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            res.status(200).json(response.data);
        } catch (error) {
            res.status(error.response.status || 500).json({
                message: "An error occurred",
                error: error.response.data,
            });
        }
    } else if (req.method == "PUT") {
        // update user details (an email and a username)
        try {
            const { id, email, username, token } = req.body;
            console.log(id);
            console.log(email);
            console.log(username);
            console.log(token);
            const response = await axios.put(
                `${process.env.STRAPI_URL}/users/${userId}`,
                {
                    id,
                    email,
                    username,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            res.status(200).json(response.data);
        } catch (error) {
            res.status(error.response.status || 500).json({
                message: "An error occurred",
                error: error.response.data,
            });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
