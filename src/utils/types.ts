export enum TodoSegmentType {
  ALL = "all",
  COMPLETED = "completed",
  ACTIVE = "active"
}

export type Todo = {
  id: string;
  name: string;
  completed: boolean;
};
