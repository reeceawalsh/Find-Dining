export default function validatePassword(errors, password, type) {
    if (!password) {
        errors.password = "Password is required.";
    } else if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/g.test(password)) {
        if (type == "new") {
            errors.newPassword =
                "Must be a secure password: At least 8 characters, with at least one uppercase letter and one digit.";
        } else {
            errors.password =
                "Must be a secure password: At least 8 characters, with at least one uppercase letter and one digit.";
        }
    }

    return errors;
}
