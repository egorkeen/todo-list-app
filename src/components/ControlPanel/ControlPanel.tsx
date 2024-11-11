import { Button, Flex, Segmented, Typography } from "antd";
import { FC, memo } from "react";
import {
  filterTodos,
  segmentsOptions,
  Todo,
  TodoSegmentType
} from "../../utils";
import styles from "./ControlPanel.module.scss";

type ControlPanelProps = {
  todos: Todo[];
  onSelectFilter: (value: TodoSegmentType) => void;
  clearCompletedTodos: () => void;
};

const ControlPanel: FC<ControlPanelProps> = memo(
  ({ todos, onSelectFilter, clearCompletedTodos }) => {
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
          onChange={onSelectFilter}
          options={segmentsOptions}
        />

        <Button
          type="default"
          onClick={clearCompletedTodos}
        >
          Clear completed
        </Button>
      </Flex>
    );
  }
);

ControlPanel.displayName = "ControlPanel";

export { ControlPanel };
