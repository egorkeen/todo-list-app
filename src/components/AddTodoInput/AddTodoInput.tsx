import { Button, Flex, Input } from "antd";
import { FC, memo, useState } from "react";

type AddTodoInputProps = {
  onAdd: (name: string) => void;
};

const AddTodoInput: FC<AddTodoInputProps> = memo(
  ({ onAdd }) => {
    const [value, setValue] = useState("");

    const handleAddTodo = () => {
      if (!value) {
        return;
      }

      onAdd(value);
      setValue("");
    };

    return (
      <Flex gap={5}>
        <Input
          placeholder="Enter todo's description"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onPressEnter={handleAddTodo}
        />
        <Button type="primary" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </Flex>
    );
  }
);

AddTodoInput.displayName = "AddTodoInput";

export { AddTodoInput };
