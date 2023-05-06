import { useState } from "react";
import TextInput from "@component/components/FormElements/TextInput";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<TextInput />", () => {
    test("On initial render value should be empty.", () => {
        render(
            <TextInput
                name="fullname"
                placeholder="Full Name"
                value=""
                onChange={() => {}}
            />
        );
        expect(screen.getByPlaceholderText(/full name/i).value).toEqual("");
    });

    test("User should be able to type into the textbox", () => {
        const TestComponent = () => {
            const [inputValue, setInputValue] = useState("");

            return (
                <TextInput
                    name="fullname"
                    placeholder="Full Name"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            );
        };

        render(<TestComponent />);
        expect(screen.getByPlaceholderText(/full name/i).value).toEqual("");

        fireEvent.change(screen.getByPlaceholderText(/full name/i), {
            target: { value: "Test 123" },
        });

        expect(screen.getByPlaceholderText(/full name/i).value).toEqual(
            "Test 123"
        );
    });
});
