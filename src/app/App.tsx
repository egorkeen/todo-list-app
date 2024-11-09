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
  const { todos,  } = useTodos(filterType);

  return (
    <Flex vertical className={styles.app}>
      <Typography.Title className={styles.title}>
        Todos
      </Typography.Title>

      <AddTodoInput />

      <TodosList />

      <ControlPanel />
    </Flex>
  );
};
