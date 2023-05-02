import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "../../components/Forms/LoginForm";

// Mock styles object, could not import default styles from comopnent
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

    const { getByPlaceholderText, getByText } = render(
      <LoginForm
        styles={styles} // Pass the mock styles object
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
    const loginButton = getByText("Login");
    const registerButton = getByText("Register");
    const forgotPasswordButton = getByText("Forgot Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(loginButton);
    fireEvent.click(registerButton);
    fireEvent.click(forgotPasswordButton);

    expect(setLoginDataMock).toHaveBeenCalledTimes(2);
    expect(handleLoginMock).toHaveBeenCalled();
    expect(handleRegisterMock).toHaveBeenCalled();
    expect(handleForgotPasswordMock).toHaveBeenCalled();
  });
});
