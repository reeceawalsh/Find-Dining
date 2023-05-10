import validatePassword from "@component/fieldValidation/Password";

// handles validating changing password, the rules and error generation is made in the above imports. the errors and item that needs validating is sent and then errors are returned. these errors are passed in as props to various form elements and forms then when they're submitted, it will display the errors if there are any.
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
