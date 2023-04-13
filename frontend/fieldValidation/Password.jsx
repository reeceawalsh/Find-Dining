export default function validatePassword(errors, password, type) {
    if (!password) {
        errors.password = "Password is required.";
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(
            password
        )
    ) {
        if (type == "new") {
            errors.newPassword =
                "Must be a secure password: At least 8 characters, with at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)";
        } else {
            errors.password =
                "Must be a secure password: At least 8 characters, with at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)";
        }
    }

    return errors;
}
