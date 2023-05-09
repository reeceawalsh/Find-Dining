export default function validateUsername(errors, username) {
    if (!username) {
        errors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9_]{3,15}$/g.test(username)) {
        errors.username =
            "Username must be 3-15 characters long, containing only digits, letters, and underscores.";
    }

    return errors;
}
