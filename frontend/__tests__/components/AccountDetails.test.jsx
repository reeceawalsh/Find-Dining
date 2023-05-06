import { fireEvent } from "@testing-library/react";
import AccountDetails from "@component/components/AccountDetails";
import { useUser } from "@component/lib/authContext";
import { render } from "../test-router";

jest.mock("@component/lib/authContext", () => ({
    useUser: () => ({
        user: {
            id: "123",
            jwt: "fake_jwt_token",
            username: "testuser",
            email: "testuser@example.com",
        },
        setUser: jest.fn(),
        loading: false,
    }),
}));

describe("AccountDetails", () => {
    it("renders the component correctly", () => {
        const { getByText } = render(<AccountDetails />);

        // Check if header is rendered
        expect(getByText("Account Details Page")).toBeInTheDocument();
    });

    // Add more test cases to check for specific behavior, such as editing and saving changes.
});
