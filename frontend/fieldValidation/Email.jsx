// email validation, takes an email and errors and returns the new errors.
export default function validateEmail(errors, email) {
    if (!email) {
        errors.email = "Email is required.";
    } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(
            email
        )
    ) {
        errors.email = "Must be a valid email address.";
    }

    return errors;
}
