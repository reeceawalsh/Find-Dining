import axios from "axios";

// gets a restaurants reviews
export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/restaurants/${id}?populate=*`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
                    },
                }
            );
            console.log(response.data);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: "An error occurred" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
