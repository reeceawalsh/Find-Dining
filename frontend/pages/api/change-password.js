import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { currentPassword, newPassword, passwordConfirmation, token } =
            req.body;

        try {
            const response = await axios.post(
                `${process.env.STRAPI_URL}/auth/change-password`,
                {
                    currentPassword,
                    password: newPassword,
                    passwordConfirmation,
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
            res.status(500).json({
                message: "An error occurred",
                error: error.response.data,
            });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
