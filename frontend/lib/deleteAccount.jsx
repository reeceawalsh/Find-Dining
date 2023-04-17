import axios from "axios";
const deleteAccount = async (userId, accessToken, logout) => {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/:${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log("Account deleted successfully:");
        logout();
    } catch (error) {
        console.error("Error:", error);
    }
};

export default deleteAccount;
