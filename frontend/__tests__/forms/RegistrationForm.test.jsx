import { render, fireEvent } from "@testing-library/react";
import RegistrationForm from "../../components/Forms/RegistrationForm";

// Mock styles object
const styles = {
    registrationForm: "registrationForm",
    username: "username",
    email: "email",
    password: "password",
    button: "button",
};

describe("RegistrationForm", () => {
    it("renders the form and handles input changes", () => {
        const setRegistrationDataMock = jest.fn();
        const handleRegisterMock = jest.fn();

        const registrationData = {
            username: "",
            email: "",
            dateOfBirth: "",
            password: "",
        };

        const { getByTestId, getByPlaceholderText, getByText } = render(
            <RegistrationForm
                styles={styles} // Pass the mock styles object
                setRegistrationData={setRegistrationDataMock}
                registrationData={registrationData}
                errors={{
                    username: "",
                    email: "",
                    dateOfBirth: "",
                    password: "",
                }}
                handleRegister={handleRegisterMock}
                alreadyRegistered={false}
            />
        );

        const usernameInput = getByPlaceholderText("Input your username");
        const emailInput = getByPlaceholderText("Input a valid email address");
        const dateOfBirthInput = getByPlaceholderText(
            "Date of Birth (dd/mm/yy)"
        );
        const passwordInput = getByPlaceholderText("Password");
        const createAccountButton = getByTestId("create-account-button");

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(dateOfBirthInput, { target: { value: "1990-01-01" } });
        fireEvent.change(passwordInput, { target: { value: "password" } });

        fireEvent.click(createAccountButton);

        expect(setRegistrationDataMock).toHaveBeenCalledTimes(4);
        expect(handleRegisterMock).toHaveBeenCalled();
    });
});
