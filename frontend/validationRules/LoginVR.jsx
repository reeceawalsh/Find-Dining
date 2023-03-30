export default function validateLogin({ email, password }) {
    let errors = {};

    if (!email) {
        errors.email = "Required";
    }

    if (!password) {
        errors.password = "Required";
    }

    return errors;
}
