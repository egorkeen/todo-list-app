import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import { TodoItem } from "./TodoItem";
import { Todo } from "../../utils";

const mockToggleTodo = jest.fn();

const todo: Todo = {
  id: "1",
  name: "Test Todo",
  completed: false
};

describe("TodoItem", () => {
  test("Текст задачи отображается корректно", () => {
    render(
      <TodoItem todo={todo} toggleTodo={mockToggleTodo} />
    );

    expect(
      screen.getByText("Test Todo")
    ).toBeInTheDocument();
  });

  test("Чекбокс отображается в состоянии 'unchecked' для невыполненной задачи", () => {
    render(
      <TodoItem todo={todo} toggleTodo={mockToggleTodo} />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("Чекбокс отображается в состоянии 'checked' для выполненной задачи", () => {
    render(
      <TodoItem
        todo={{ ...todo, completed: true }}
        toggleTodo={mockToggleTodo}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("toggleTodo вызывается при клике на чекбокс", () => {
    render(
      <TodoItem todo={todo} toggleTodo={mockToggleTodo} />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggleTodo).toHaveBeenCalledWith(todo.id);
  });

  test("Класс 'crossed' добавляется для выполненной задачи", () => {
    render(
      <TodoItem
        todo={{ ...todo, completed: true }}
        toggleTodo={mockToggleTodo}
      />
    );

    const todoText = screen.getByText("Test Todo");
    expect(todoText).toHaveClass("crossed");
  });

  test("Класс 'crossed' не добавляется для невыполненной задачи", () => {
    render(
      <TodoItem todo={todo} toggleTodo={mockToggleTodo} />
    );

    const todoText = screen.getByText("Test Todo");
    expect(todoText).not.toHaveClass("crossed");
  });
});
