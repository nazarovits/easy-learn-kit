import { useRef } from "react";

import { getRandomInteger } from "../utils/getRandomInteger";
import { createListWithNumbers } from "../utils";
import ArithmeticTableContainer, { Operation, Task } from "../ArithmeticTable";

const taskCount = 10;
const createTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map((_) => {
    const number1 = getRandomInteger(2, 9);
    const number2 = getRandomInteger(2, 9);
    const expectedResult = number1 * number2;

    return {
      number1,
      number2,
      expectedResult,
    };
  });

  return tasks;
};

export interface MultiplicationTableProps {}

export const MultiplicationTable = () => {
  const tasks = useRef(createTasks()).current;

  return (
    <ArithmeticTableContainer
      title="Szorzás"
      operation={Operation.Multiplication}
      tasks={tasks}
    />
  );
};

export default MultiplicationTable;
