import validateDateOfBirth from "@component/fieldValidation/DateOfBirth";
import validateUsername from "@component/fieldValidation/UserName";

export default function validateRegistration({
    username,
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
}) {
    let errors = {};

    errors = validateUsername(errors, username);

    errors = validateEmail(errors, email);

    errors = validatePassword(errors, password);

    if (!firstName) {
        errors.firstName = "Required";
    }

    if (!lastName) {
        errors.lastName = "Required";
    }

    errors = validateDateOfBirth(errors, dateOfBirth);

    return errors;
}
