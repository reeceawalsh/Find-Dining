export default function validateLogin({ email, password }) {
    let errors = {};

    /** do not want to validate the email and password as it has been done already in the registration process. providing specific validation error messages during login is dangerous and could help attackers.**/
    if (!email) {
        errors.email = "Required";
    }

    if (!password) {
        errors.password = "Required";
    }

    return errors;
}
