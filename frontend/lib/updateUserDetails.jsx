import axios from "axios";
// update user details (an email and a username)
async function updateUserDetails(id, email, name, token) {
    const userData = { id: id, email: email, name: name, token: token };
    console.log(userData);
    try {
        const response = await axios.put("/api/user", userData);
        return response;
    } catch (error) {
        console.log("Error occurred while changing account details.", error);
        throw error;
    }
}

export default updateUserDetails;
