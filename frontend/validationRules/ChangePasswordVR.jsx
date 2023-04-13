import validatePassword from "@component/fieldValidation/Password";

export default function validateChangePassword({
    newPassword,
    confirmPassword,
}) {
    let errors = {};

    errors = validatePassword(errors, newPassword, "new");

    if (newPassword !== confirmPassword) {
        errors.newPassword = "Both passwords must match.";
    }

    return errors;
}
