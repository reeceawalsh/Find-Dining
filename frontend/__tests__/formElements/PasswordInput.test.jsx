import PasswordInput from "@component/components/FormElements/PasswordInput";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<PasswordInput />", () => {
    test("User should be able to toggle password visibility", () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(
            <PasswordInput
                name="password"
                placeholder="Password"
                value=""
                onChange={mockOnChange}
                error={false}
            />
        );

        // Find the password input
        const passwordInput = screen.getByPlaceholderText("Password");

        // Check that the initial input type is "password" (meaning password is hidden)
        expect(passwordInput.type).toBe("password");

        //Find the eye icon button
        const eyeIconButton = screen.getByTestId("eye-button");

        // Toggle visibility
        fireEvent.click(eyeIconButton);

        // Check that the input type changes to "text" (meaning password is visible)
        expect(passwordInput.type).toBe("text");

        // Toggle visibility back
        fireEvent.click(eyeIconButton);

        // Check that the input type changes back to "password" (meaning password is hidden)
        expect(passwordInput.type).toBe("password");
    });
});
