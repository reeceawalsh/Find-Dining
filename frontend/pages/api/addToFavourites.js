import axios from "axios";

// updates the users list of favourites
async function updateUserFavourites(uuid, restaurants, retryCount = 0) {
    const maxRetries = 3;
    try {
        const data = JSON.stringify({
            restaurants: restaurants,
        });
        console.log(data);

        const response = await axios.put(
            `${process.env.STRAPI_URL}/users/${uuid}?populate=*`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                    "Content-Type": "application/json",
                },
                maxBodyLength: Infinity,
            }
        );

        return response.data;
    } catch (error) {
        if (error.message.includes("Deadlock") && retryCount < maxRetries) {
            console.log("Deadlock detected, retrying...");
            return updateUserFavourites(uuid, restaurants, retryCount + 1);
        } else {
            throw error;
        }
    }
}

export default async function handler(req, res) {
    if (req.method === "PUT") {
        console.log(req.body);
        const { uuid, restaurants } = req.body;

        console.log("Restaurants to add to favourites", restaurants);
        try {
            const response = await updateUserFavourites(uuid, restaurants);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
