import axios from "axios";
const changePassword = (
    password,
    newPassword,
    confirmPassword,
    accessToken
) => {
    let data = {
        currentPassword: password,
        newPassword: newPassword,
        passwordConfirmation: confirmPassword,
        token: accessToken,
    };

    axios
        .post("/api/change-password", data)
        .then(function (response) {
            console.log("Successfully changed password.", response.data);
        })
        .catch(function (error) {
            console.error("Error:" + error);
        });
};

export default changePassword;
