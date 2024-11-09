import { Flex, Typography } from "antd";
import styles from "./App.module.scss";
import {
  AddTodoInput,
  ControlPanel,
  TodosList
} from "../components";
import { useState } from "react";
import { TodoSegmentType, useTodos } from "../utils";

export const App = () => {
  const [filterType, setFilterType] = useState(
    TodoSegmentType.ALL
  );
  const { todos, addTodo, toggleTodo } =
    useTodos(filterType);

  return (
    <Flex gap={10} vertical className={styles.app}>
      <Typography.Title className={styles.title}>
        Todos
      </Typography.Title>

      <AddTodoInput onAdd={addTodo} />

      <TodosList toggleTodo={toggleTodo} todos={todos} />

      <ControlPanel />
    </Flex>
  );
};
