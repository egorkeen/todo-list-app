import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";
import { AddTodoInput } from "./AddTodoInput";

describe("Компонент AddTodoInput", () => {
  test("Рендерим инпут и кнопки", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoInput onAdd={mockOnAdd} />);

    expect(
      screen.getByPlaceholderText(
        "Enter todo's description"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Todo/i })
    ).toBeInTheDocument();
  });

  test("onAdd вызывается когда мы ввели корректное значение и нажали на кнопку", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText(
      "Enter todo's description"
    );
    const button = screen.getByRole("button", {
      name: /Add Todo/i
    });

    fireEvent.change(input, {
      target: { value: "New Todo" }
    });

    expect(input).toHaveValue("New Todo");

    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith("New Todo");

    expect(input).toHaveValue("");
  });

  test("onAdd не вызывается при пустом значении в инпуте", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodoInput onAdd={mockOnAdd} />);

    const button = screen.getByRole("button", {
      name: /Add Todo/i
    });

    fireEvent.click(button);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test("onAdd вызывается при нажатии клавиши Enter в поле ввода", async () => {
    const mockOnAdd = jest.fn();

    render(<AddTodoInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText(
      "Enter todo's description"
    );

    fireEvent.change(input, {
      target: { value: "New Todo" }
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      charCode: 13
    });

    await waitFor(() =>
      expect(mockOnAdd).toHaveBeenCalledWith("New Todo")
    );

    expect(input).toHaveValue("");
  });
});
