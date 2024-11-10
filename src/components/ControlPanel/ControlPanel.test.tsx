import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import { ControlPanel } from "./ControlPanel";
import { TodoSegmentType } from "../../utils";

const mockSetFilterType = jest.fn();
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
        setFilterType={mockSetFilterType}
        clearCompletedTodos={mockClearCompletedTodos}
      />
    );

    expect(
      screen.getByText(/2 todos left/i)
    ).toBeInTheDocument();
  });

  test("setFilterType вызывается при изменении фильтра", () => {
    render(
      <ControlPanel
        todos={todos}
        setFilterType={mockSetFilterType}
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

    expect(mockSetFilterType).toHaveBeenCalledWith(
      TodoSegmentType.ACTIVE
    );

    fireEvent.click(allFilter);

    expect(mockSetFilterType).toHaveBeenCalledWith(
      TodoSegmentType.ALL
    );
  });

  test("clearCompletedTodos вызывается при нажатии на кнопку", () => {
    render(
      <ControlPanel
        todos={todos}
        setFilterType={mockSetFilterType}
        clearCompletedTodos={mockClearCompletedTodos}
      />
    );

    const clearButton =
      screen.getByText(/Clear completed/i);

    fireEvent.click(clearButton);

    expect(mockClearCompletedTodos).toHaveBeenCalled();
  });
});
