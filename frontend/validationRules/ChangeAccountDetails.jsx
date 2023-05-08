import validateEmail from "@component/fieldValidation/Email";
import validateUsername from "@component/fieldValidation/UserName";

export default function validationAccountDetails({ username, email }) {
    let errors = {};

    errors = validateUsername(errors, username);

    errors = validateEmail(errors, email);

    return errors;
}
