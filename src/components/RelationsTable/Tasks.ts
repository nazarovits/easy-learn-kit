export type RelationType = "<" | "=" | ">" | "";

export interface Task {
  number1: number;
  number2: number;
  expectedResult: RelationType; // TODO: expected result is not needed
}

export interface RelationsTableProps {
  title: string;
  tasks: Task[];
  hasStartButton?: boolean;
}

export const getExpectedRelationType = (a: number, b: number): RelationType => {
  if (a < b) {
    return "<";
  } else if (a == b) {
    return "=";
  } else {
    return ">";
  }
};
