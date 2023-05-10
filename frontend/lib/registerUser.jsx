import axios from "axios";
// handles registering a user
async function registerUser(userData) {
    try {
        const response = await axios.post("/api/register", userData);
        return response;
    } catch (error) {
        console.error("Error occurred during registration", error);
        throw error;
    }
}

export default registerUser;
