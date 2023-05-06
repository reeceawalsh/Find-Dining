import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm";

// Mock styles object
const styles = {
    password: "password",
    button: "button",
};

describe("ChangePasswordForm", () => {
    it("renders the form and handles input changes", () => {
        const setPasswordDataMock = jest.fn();
        const handleChangePasswordMock = jest.fn();

        const passwordData = {
            password: "",
            newPassword: "",
            confirmPassword: "",
        };

        const { getByTestId, getByPlaceholderText, getByText } = render(
            <ChangePasswordForm
                styles={styles} // Pass the mock styles object
                setPasswordData={setPasswordDataMock}
                passwordData={passwordData}
                errors={{ newPassword: "", confirmPassword: "" }}
                handleChangePassword={handleChangePasswordMock}
            />
        );

        const passwordInput = getByPlaceholderText("Input your password");
        const newPasswordInput = getByPlaceholderText("New Password");
        const confirmPasswordInput = getByPlaceholderText("Confirm Password");
        const changePasswordButton = getByTestId("change-password-button");

        fireEvent.change(passwordInput, { target: { value: "oldPassword" } });
        fireEvent.change(newPasswordInput, {
            target: { value: "newPassword" },
        });
        fireEvent.change(confirmPasswordInput, {
            target: { value: "newPassword" },
        });

        fireEvent.click(changePasswordButton);

        expect(setPasswordDataMock).toHaveBeenCalledTimes(3);
        expect(handleChangePasswordMock).toHaveBeenCalled();
    });
});
