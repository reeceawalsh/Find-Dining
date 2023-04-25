import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "POST") {
        console.log(req.body);
        const { uuid, restaurants } = req.body;
        let data = JSON.stringify({
            restaurants: restaurants,
        });

        console.log("restaurants to add to favourites", restaurants);
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${uuid}?populate=*`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    maxBodyLength: Infinity,
                }
            );
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
