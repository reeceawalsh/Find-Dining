import axios from "axios";

const deleteAccount = (userId, accessToken, logout) => {
    let data = {
        userId: userId,
        token: accessToken,
    };

    axios
        .post("/api/delete-account", data)
        .then(function (response) {
            console.log("Account deleted successfully:", response.data);
            logout();
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
};
export default deleteAccount;
