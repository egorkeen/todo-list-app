import { Button, Flex, Input } from "antd";
import { FC, useState } from "react";

type AddTodoInputProps = {
  onAdd: (name: string) => void;
};

export const AddTodoInput: FC<AddTodoInputProps> = ({
  onAdd
}) => {
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
};
