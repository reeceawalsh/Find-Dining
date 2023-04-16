import DateInput from "@component/components/FormElements/DateInput";
import { fireEvent, render, screen } from "@testing-library/react";


describe("<DateInput />", () => {
   test("On initial render value should be empty.", () => {
       render(<DateInput name="birthdate" placeholder="Birth Date" />);


       // check that the value is initially empty
       expect(screen.getByPlaceholderText(/birth date/i).value).toEqual("");
   });


   test("User should be able to select a date", () => {
       render(<DateInput name="birthdate" placeholder="Birth Date" />);


       // check that the value is initially empty
       expect(screen.getByPlaceholderText(/birth date/i).value).toEqual("");


       // change the value to 2023-04-09
       fireEvent.change(screen.getByPlaceholderText(/birth date/i), {
           target: { value: "2023-04-09" },
       });


       // check that the value is 2023-04-09
       expect(screen.getByPlaceholderText(/birth date/i).value).toEqual(
           "2023-04-09"
       );
   });
});
