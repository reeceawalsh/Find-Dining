// validation for a data of birth, ensures the user is atleast 13 years old.
export default function validateDateOfBirth(errors, dateOfBirth) {
    if (!dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required.";
    } else {
        const currentDate = new Date();
        const birthDate = new Date(dateOfBirth);
        const ageDifference = currentDate - birthDate;
        const age = ageDifference / (1000 * 60 * 60 * 24 * 365.25); // converts to years.

        // user must be atleast 13 years old due to data protection laws.
        if (age < 13) {
            errors.dateOfBirth = "User must be at least 13 years old.";
        }
    }

    return errors;
}
