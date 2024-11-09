import { Button, Flex, Segmented, Typography } from "antd";
import { FC } from "react";
import {
  filterTodos,
  segmentsOptions,
  Todo,
  TodoSegmentType
} from "../../utils";
import styles from "./ControlPanel.module.scss";

type ControlPanelProps = {
  todos: Todo[];
  setFilterType: React.Dispatch<
    React.SetStateAction<TodoSegmentType>
  >;
  clearCompletedTodos: () => void;
};

export const ControlPanel: FC<ControlPanelProps> = ({
  todos,
  setFilterType,
  clearCompletedTodos
}) => {
  const activeTodosLength = filterTodos(
    todos,
    TodoSegmentType.ACTIVE
  ).length;

  return (
    <Flex
      className={styles.controlPanel}
      justify="space-between"
    >
      <Typography.Text className={styles.counter}>
        {activeTodosLength} todos left
      </Typography.Text>

      <Segmented
        onChange={(value) => setFilterType(value)}
        options={segmentsOptions}
      />

      <Button type="default" onClick={clearCompletedTodos}>
        Clear completed
      </Button>
    </Flex>
  );
};
