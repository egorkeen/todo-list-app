import { Todo, TodoSegmentType } from "../types";

export const filterTodos = (
  todos: Todo[],
  filter: TodoSegmentType
) => {
  switch (filter) {
    case TodoSegmentType.ALL:
      return todos;

    case TodoSegmentType.ACTIVE:
      return todos.filter((todo) => !todo.completed);

    case TodoSegmentType.COMPLETED:
      return todos.filter((todo) => todo.completed);

    default:
      return todos;
  }
};
