import { Flex, Typography } from "antd";
import styles from "./App.module.scss";
import {
  AddTodoInput,
  ControlPanel,
  TodosList
} from "../components";

export const App = () => {
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
