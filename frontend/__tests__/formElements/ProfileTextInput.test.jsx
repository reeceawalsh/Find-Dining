import { useState } from "react";
import ProfileTextInput from "@component/components/FormElements/ProfileTextInput";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<ProfileTextInput />", () => {
  test("Initial render, typing into input and toggling edit", () => {
    const TestWrapper = () => {
      const [value, setValue] = useState("");
      const [editable, setEditable] = useState(false);
      const mockOnChange = jest.fn((e) => setValue(e.target.value));
      const mockOnToggleEditable = jest.fn(() => setEditable(!editable));

      return (
        <ProfileTextInput
          name="profile"
          placeholder="Profile"
          value={value}
          onChange={mockOnChange}
          editable={editable}
          onToggleEditable={mockOnToggleEditable}
          hasEditButton
        />
      );
    };

    render(<TestWrapper />);

    // Check that the value is initially empty
    expect(screen.getByPlaceholderText("Profile").value).toEqual("");

    // Check that the input is read-only
    expect(screen.getByPlaceholderText("Profile").readOnly).toBe(true);

    // Find the edit button
    const editButton = screen.getByRole("button");

    // Toggle edit state
    fireEvent.click(editButton);

    // Change the input value to "New profile info"
    fireEvent.change(screen.getByPlaceholderText("Profile"), {
      target: { value: "New profile info" },
    });

    // Check that the new value is "New profile info"
    expect(screen.getByPlaceholderText("Profile").value).toEqual(
      "New profile info"
    );

    // Toggle edit state back
    fireEvent.click(editButton);
  });
});
