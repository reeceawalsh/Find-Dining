import axios from "axios";
// update user details (an email and a username)
async function updateUserDetails(id, email, username, token) {
    const userData = { id: id, email: email, username: username, token: token };
    console.log(userData);
    try {
        const response = await axios.put("/api/user", userData);
        return response.data;
    } catch (error) {
        console.log("Error occurred while changing account details.", error);
        throw error;
    }
}

export default updateUserDetails;
