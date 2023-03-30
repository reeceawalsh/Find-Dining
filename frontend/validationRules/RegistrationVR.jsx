export default function validateRegistration({
    username,
    email,
    password,
    firstName,
    lastName,
}) {
    let errors = {};

    if (!username) {
        errors.username = "Required";
    }

    if (!email) {
        errors.email = "Required";
    }

    if (!password) {
        errors.password = "Required";
    }

    if (!firstName) {
        errors.firstName = "Required";
    }

    if (!lastName) {
        errors.lastName = "Required";
    }

    return errors;
}
