import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "@component/components/Forms/LoginForm";

const styles = {
    loginForm: "loginForm",
    email: "email",
    password: "password",
    errorMessage: "errorMessage",
    buttons: "buttons",
    button: "button",
};

describe("LoginForm", () => {
    it("renders the form and handles input changes", () => {
        const setLoginDataMock = jest.fn();
        const handleForgotPasswordMock = jest.fn();
        const handleLoginMock = jest.fn();
        const handleRegisterMock = jest.fn();

        const loginData = {
            email: "",
            password: "",
        };

        const { getByTestId, getByPlaceholderText, getByText } = render(
            <LoginForm
                styles={styles}
                setLoginData={setLoginDataMock}
                loginData={loginData}
                errors={{ email: "", password: "" }}
                handleForgotPassword={handleForgotPasswordMock}
                handleLogin={handleLoginMock}
                handleRegister={handleRegisterMock}
                validLogin={true}
            />
        );

        const emailInput = getByPlaceholderText("Input your email address");
        const passwordInput = getByPlaceholderText("Input your password");
        const loginButton = getByTestId("login-button");
        const registerButton = getByTestId("register-button");
        const forgotPasswordButton = getByTestId("forgot-password-button");

        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "Password1!" } });

        fireEvent.click(loginButton);
        fireEvent.click(registerButton);
        fireEvent.click(forgotPasswordButton);

        // once to set email and once to set password
        expect(setLoginDataMock).toHaveBeenCalledTimes(2);
        expect(handleLoginMock).toHaveBeenCalled();
        expect(handleRegisterMock).toHaveBeenCalled();
        expect(handleForgotPasswordMock).toHaveBeenCalled();
    });
});
