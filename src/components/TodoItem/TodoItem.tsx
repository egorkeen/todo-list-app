import { FC, memo } from "react";
import { Todo } from "../../utils";
import { Checkbox, Flex, Typography } from "antd";
import styles from "./TodoItem.module.scss";
import clsx from "clsx";

type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: Todo["id"]) => void;
};

const TodoItem: FC<TodoItemProps> = memo(
  ({ todo, toggleTodo }) => {
    const handleCheckboxClick = () => {
      toggleTodo(todo.id);
    };

    return (
      <Flex align="center" gap={10} className={styles.todo}>
        <Checkbox
          onChange={handleCheckboxClick}
          checked={todo.completed}
        />
        <Typography.Text
          ellipsis
          className={clsx(
            styles.text,
            todo.completed && styles.crossed
          )}
        >
          {todo.name}
        </Typography.Text>
      </Flex>
    );
  }
);

TodoItem.displayName = "TodoItem";

export { TodoItem };
