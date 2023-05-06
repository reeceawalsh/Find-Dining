import Login from "@component/components/Login";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../lib/test-router";
import "@testing-library/jest-dom/extend-expect";
import { waitFor } from "@testing-library/react";

HTMLFormElement.prototype.requestSubmit = jest.fn();

describe("Login component", () => {
    test("Email and password inputs are initially empty", () => {
        render(<Login />);

        expect(screen.getByPlaceholderText(/email or username/i).value).toBe(
            ""
        );
        expect(screen.getByPlaceholderText(/password/i).value).toBe("");
    });

    test("Typing in the email and password inputs updates their values", () => {
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/email or username/i), {
            target: { value: "test@test.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "Password1!" },
        });

        expect(screen.getByPlaceholderText(/email or username/i).value).toBe(
            "test@test.com"
        );
        expect(screen.getByPlaceholderText(/password/i).value).toBe(
            "Password1!"
        );
    });

    test("Login button is initially disabled", () => {
        render(<Login />);

        expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
    });

    test("Login button is enabled when email and password inputs have valid values", () => {
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/email or username/i), {
            target: { value: "test@test.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "Password1!" },
        });

        expect(
            screen.getByRole("button", { name: /login/i })
        ).not.toBeDisabled();
    });

    test("Clicking Forgot Password shows the modal", async () => {
        render(<Login />);

        // Find and click the Forgot Password link
        const forgotPasswordLink = screen.getByText(/Forgot Password/i, {
            selector: "button",
        });
        fireEvent.click(forgotPasswordLink);

        // Wait for the modal to appear and check if it's in the document
        await waitFor(() => {
            expect(
                screen.getByText(
                    /Please enter your email to reset your password/i
                )
            ).toBeInTheDocument();
        });
    });
});
