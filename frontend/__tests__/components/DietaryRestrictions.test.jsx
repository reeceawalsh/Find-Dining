import { fireEvent } from "@testing-library/react";
import DietaryRestrictions from "@component/components/DietaryRestrictions";
import { useUser } from "@component/lib/authContext";
import { render } from "../test-router";

jest.mock("@component/lib/authContext", () => ({
    useUser: jest.fn(),
}));

describe("DietaryRestrictions", () => {
    beforeEach(() => {
        useUser.mockReturnValue({ user: {}, loading: false });
    });

    it("renders the component and toggles restrictions", () => {
        const { getByText } = render(<DietaryRestrictions />);

        const veganButton = getByText("Vegan");
        const vegetarianButton = getByText("Vegetarian");
        const resetButton = getByText("Reset");

        // Check initial state
        expect(veganButton).not.toHaveClass("selected");
        expect(vegetarianButton).not.toHaveClass("selected");

        // Toggle Vegan button
        fireEvent.click(veganButton);
        expect(veganButton).toHaveClass("selected");
        expect(vegetarianButton).not.toHaveClass("selected");

        // Toggle Vegetarian button
        fireEvent.click(vegetarianButton);
        expect(veganButton).toHaveClass("selected");
        expect(vegetarianButton).toHaveClass("selected");

        // Reset button
        fireEvent.click(resetButton);
        expect(veganButton).not.toHaveClass("selected");
        expect(vegetarianButton).not.toHaveClass("selected");
    });
});
