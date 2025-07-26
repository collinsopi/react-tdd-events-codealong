import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'; // Needed for .toBeInTheDocument(), .toBeChecked(), etc.
import App from "../App";

// Test 1: Checkbox becomes checked when clicked
test("checkbox appears as checked when user clicks it", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
});

// Test 2: Topping appears in toppings list when checked
test("topping appears in toppings list when checked", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  userEvent.click(addPepperoni);

  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();
});

// Test 3: Topping disappears when checkbox is unchecked
test("selected topping disappears when checked a second time", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  // Check the box
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();

  // Uncheck the box
  userEvent.click(addPepperoni);
  expect(addPepperoni).not.toBeChecked();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});
