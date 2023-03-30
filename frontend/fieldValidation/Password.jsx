export default function validatePassword(errors, password) {
    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
}
