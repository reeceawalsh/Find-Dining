import validateDateOfBirth from "@component/fieldValidation/DateOfBirth";
import validateEmail from "@component/fieldValidation/Email";
import validatePassword from "@component/fieldValidation/Password";
import validateUsername from "@component/fieldValidation/UserName";

// handles validating registration, the rules and error generation is made in the above imports. the errors and item that needs validating is sent and then errors are returned. these errors are passed in as props to various form elements and forms then when they're submitted, it will display the errors if there are any.
export default function validateRegistration({
    username,
    email,
    password,
    dateOfBirth,
}) {
    let errors = {};

    errors = validateUsername(errors, username);

    errors = validateEmail(errors, email);

    errors = validatePassword(errors, password);

    errors = validateDateOfBirth(errors, dateOfBirth);

    return errors;
}
