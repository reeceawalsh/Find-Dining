import validateEmail from "@component/fieldValidation/Email";
import validateUsername from "@component/fieldValidation/UserName";

// handles validating account details, the rules and error generation is made in the above imports. the errors and item that needs validating is sent and then errors are returned. these errors are passed in as props to various form elements and forms then when they're submitted, it will display the errors if there are any.
export default function validationAccountDetails({ username, email }) {
    let errors = {};

    errors = validateUsername(errors, username);

    errors = validateEmail(errors, email);

    return errors;
}
