import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import { ControlPanel } from "./ControlPanel";
import { TodoSegmentType } from "../../utils";

const mockOnSelectFilter = jest.fn();
const mockClearCompletedTodos = jest.fn();

describe("ControlPanel", () => {
  const todos = [
    { id: "1", name: "Todo 1", completed: false },
    { id: "2", name: "Todo 2", completed: true },
    { id: "3", name: "Todo 3", completed: false }
  ];

  test("Отображается корректное количество активных задач", () => {
    render(
      <ControlPanel
        todos={todos}
        onSelectFilter={mockOnSelectFilter}
        clearCompletedTodos={mockClearCompletedTodos}
      />
    );

    expect(
      screen.getByText(/2 todos left/i)
    ).toBeInTheDocument();
  });

  test("onSelectFilter вызывается при изменении фильтра", () => {
    render(
      <ControlPanel
        todos={todos}
        onSelectFilter={mockOnSelectFilter}
        clearCompletedTodos={mockClearCompletedTodos}
      />
    );

    const allFilter = screen.getByRole("radio", {
      name: /all/i
    });
    const activeFilter = screen.getByRole("radio", {
      name: /active/i
    });

    fireEvent.click(activeFilter);

    expect(mockOnSelectFilter).toHaveBeenCalledWith(
      TodoSegmentType.ACTIVE
    );

    fireEvent.click(allFilter);

    expect(mockOnSelectFilter).toHaveBeenCalledWith(
      TodoSegmentType.ALL
    );
  });

  test("clearCompletedTodos вызывается при нажатии на кнопку", () => {
    render(
      <ControlPanel
        todos={todos}
        onSelectFilter={mockOnSelectFilter}
        clearCompletedTodos={mockClearCompletedTodos}
      />
    );

    const clearButton =
      screen.getByText(/Clear completed/i);

    fireEvent.click(clearButton);

    expect(mockClearCompletedTodos).toHaveBeenCalled();
  });
});
