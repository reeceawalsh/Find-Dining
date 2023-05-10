// handles validating login, the rules and error generation is made in the above imports. the errors and item that needs validating is sent and then errors are returned. these errors are passed in as props to various form elements and forms then when they're submitted, it will display the errors if there are any.
export default function validateLogin({ identifier, password }) {
    let errors = {};

    /** do not want to validate the email and password as it has been done already in the registration process. providing specific validation error messages during login is dangerous and could help attackers.**/
    if (!identifier) {
        errors.identifier = "Required";
    }

    if (!password) {
        errors.password = "Required";
    }

    return errors;
}
