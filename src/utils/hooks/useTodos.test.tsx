import { act, renderHook } from "@testing-library/react";
import { useTodos } from "./useTodos";
import { TodoSegmentType } from "../types";

describe("useTodos", () => {
  test("clearCompletedTodos удаляет все завершенные задачи", () => {
    const { result } = renderHook(() =>
      useTodos(TodoSegmentType.ALL)
    );

    act(() => {
      result.current.addTodo("First Todo");
      result.current.addTodo("Second Todo");
    });

    expect(result.current.todos).toHaveLength(2);

    act(() => {
      result.current.toggleTodo(result.current.todos[0].id);
    });

    act(() => {
      result.current.clearCompletedTodos();
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].name).toBe(
      "Second Todo"
    );
    expect(result.current.todos[0].completed).toBe(false);
  });

  test("addTodo добавляет новую задачу", () => {
    const { result } = renderHook(() =>
      useTodos(TodoSegmentType.ALL)
    );

    act(() => {
      result.current.addTodo("New Task");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].name).toBe("New Task");
    expect(result.current.todos[0].completed).toBe(false);
  });

  test("removeTodo удаляет задачу по id", () => {
    const { result } = renderHook(() =>
      useTodos(TodoSegmentType.ALL)
    );

    act(() => {
      result.current.addTodo("Task to Remove");
      result.current.addTodo("Task to Keep");
    });

    expect(result.current.todos).toHaveLength(2);

    act(() => {
      result.current.removeTodo(result.current.todos[0].id);
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].name).toBe(
      "Task to Keep"
    );
  });

  test("toggleTodo переключает состояние завершения задачи", () => {
    const { result } = renderHook(() =>
      useTodos(TodoSegmentType.ALL)
    );

    act(() => {
      result.current.addTodo("Task to Toggle");
    });

    expect(result.current.todos[0].completed).toBe(false);

    act(() => {
      result.current.toggleTodo(result.current.todos[0].id);
    });

    expect(result.current.todos[0].completed).toBe(true);
  });
});
