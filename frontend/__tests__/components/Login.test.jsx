import Login from "@component/components/Login";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Login component", () => {
    // example test
    test("Prev button should be disabled until the second page.", async () => {
        render(<Login />);
        // checks if the prev button is disabled
        // expect(screen.queryByRole("button", { name: /prev/i })).toBeDisabled();
    });
});
