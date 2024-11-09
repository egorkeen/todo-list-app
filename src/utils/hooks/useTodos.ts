import { useCallback, useMemo, useState } from "react";
import { Todo, TodoSegmentType } from "../types";
import { filterTodos } from "../helpers";

type UseTodos = (filter: TodoSegmentType) => {
  todos: Todo[];
  addTodo: (todoName: string) => void;
  removeTodo: (id: Todo["id"]) => void;
  clearCompletedTodos: () => void;
};

export const useTodos: UseTodos = (
  filter: TodoSegmentType
) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const filteredTodos = filterTodos(todos, filter);

  const addTodo = useCallback((todoName: string) => {
    const newTodo: Todo = {
      name: todoName,
      completed: false,
      id: new Date().toDateString()
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  const removeTodo = useCallback(
    (id: Todo["id"]) => {
      const updatedTodos = todos.filter(
        (todo) => todo.id !== id
      );

      setTodos(updatedTodos);
    },
    [todos]
  );

  const clearCompletedTodos = useCallback(() => {
    const clearedTodos = todos.filter(
      (todo) => !todo.completed
    );

    setTodos(clearedTodos);
  }, []);

  const result = useMemo(
    () => ({
      todos: filteredTodos,
      addTodo,
      removeTodo,
      clearCompletedTodos
    }),
    []
  );

  return result;
};
