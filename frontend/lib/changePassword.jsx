import axios from "axios";
const changePassword = async (
    password,
    newPassword,
    confirmPassword,
    accessToken
) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/change-password`,
            {
                currentPassword: password,
                password: newPassword,
                passwordConfirmation: confirmPassword,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log("Successfully changed password.");
    } catch (error) {
        console.error("Error:" + error);
    }
};

export default changePassword;
