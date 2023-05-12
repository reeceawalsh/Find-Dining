import axios from "axios";
// handles logging in
async function loginUser(userData) {
    console.log(userData);
    try {
        const response = await axios.post("/api/login", userData);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error occurred during login", error);
        throw error;
    }
}

export default loginUser;
