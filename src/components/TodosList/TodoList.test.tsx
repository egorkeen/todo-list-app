import { render, screen } from "@testing-library/react";
import { TodosList } from "./TodosList";
import { Todo } from "../../utils";

const mockToggleTodo = jest.fn();

const todos: Todo[] = [
  { id: "1", name: "Test Todo 1", completed: false },
  { id: "2", name: "Test Todo 2", completed: true }
];

describe("TodosList", () => {
  test("Список задач отображается, если массив задач не пуст", () => {
    render(
      <TodosList
        todos={todos}
        toggleTodo={mockToggleTodo}
      />
    );

    expect(
      screen.getByText("Test Todo 1")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Test Todo 2")
    ).toBeInTheDocument();
  });

  test("Компонент 'Empty' отображается, если массив задач пуст", () => {
    render(
      <TodosList todos={[]} toggleTodo={mockToggleTodo} />
    );

    expect(
      screen.getByText("No data", {
        selector: ".ant-empty-description"
      })
    ).toBeInTheDocument();
  });

  test("toggleTodo передается в каждый компонент TodoItem", () => {
    render(
      <TodosList
        todos={todos}
        toggleTodo={mockToggleTodo}
      />
    );

    const todoItems = screen.getAllByRole("checkbox");
    todoItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
