import { SegmentedOptions } from "antd/es/segmented";
import { TodoSegmentType } from "../types";

export const segmentsOptions: SegmentedOptions<TodoSegmentType> =
  [
    {
      value: TodoSegmentType.ALL,
      label: "All"
    },
    {
      value: TodoSegmentType.COMPLETED,
      label: "Completed"
    },
    {
      value: TodoSegmentType.ACTIVE,
      label: "Active"
    }
  ] as const;
