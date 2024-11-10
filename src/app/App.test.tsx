import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import { App } from "./App";
import { TodoSegmentType } from "../utils";
import { useTodos } from "../utils/hooks/useTodos";

jest.mock("../utils/hooks/useTodos");

describe("App", () => {
  beforeEach(() => {
    (useTodos as jest.Mock).mockImplementation(
      (filterType) => {
        const todos = [
          {
            id: "1",
            name: "Active Todo",
            completed: false
          },
          {
            id: "2",
            name: "Completed Todo",
            completed: true
          }
        ];
        const filteredTodos =
          filterType === TodoSegmentType.COMPLETED
            ? todos.filter((todo) => todo.completed)
            : filterType === TodoSegmentType.ACTIVE
              ? todos.filter((todo) => !todo.completed)
              : todos;

        return {
          todos: filteredTodos,
          addTodo: jest.fn(),
          toggleTodo: jest.fn(),
          clearCompletedTodos: jest.fn()
        };
      }
    );
  });

  test("должен отображать все задачи по умолчанию", () => {
    render(<App />);

    expect(
      screen.getByText("Active Todo")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Completed Todo")
    ).toBeInTheDocument();
  });

  test("фильтрация работает для сегмента ACTIVE", () => {
    render(<App />);

    const activeFilterButton = screen.getByText("Active");
    fireEvent.click(activeFilterButton);

    expect(screen.queryByText("Completed Todo")).toBeNull();
    expect(
      screen.getByText("Active Todo")
    ).toBeInTheDocument();
  });

  test("фильтрация работает для сегмента COMPLETED", () => {
    render(<App />);

    const completedFilterButton =
      screen.getByText("Completed");
    fireEvent.click(completedFilterButton);

    expect(screen.queryByText("Active Todo")).toBeNull();
    expect(
      screen.getByText("Completed Todo")
    ).toBeInTheDocument();
  });
});
