import { FC, memo } from "react";
import { Todo } from "../../utils";
import { TodoItem } from "../TodoItem";
import { Empty, Flex } from "antd";
import styles from "./TodosList.module.scss";

type TodosListProps = {
  todos: Todo[];
  toggleTodo: (id: Todo["id"]) => void;
};

const TodosList: FC<TodosListProps> = memo(
  ({ todos, toggleTodo }) => {
    return (
      <Flex
        className={styles.todos}
        align="center"
        vertical
        gap={15}
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
          />
        ))}

        {todos.length === 0 && (
          <Empty className={styles.empty} />
        )}
      </Flex>
    );
  }
);

TodosList.displayName = "TodosList";

export { TodosList };
