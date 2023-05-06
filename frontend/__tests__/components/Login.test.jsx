import Login from "@component/components/Login";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../test-router";

describe("Login component", () => {
    // example test
    test("Prev button should be disabled until the second page.", async () => {
        render(<Login />);
        // checks if the prev button is disabled
        expect(screen.queryByRole("button", { name: /prev/i })).toBeDisabled();
    });
});
