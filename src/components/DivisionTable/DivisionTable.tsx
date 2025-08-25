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

    const mult = number1 * number2;

    return {
      number1: mult,
      number2,
      expectedResult: number1,
    };
  });

  return tasks;
};

export interface DivisionTableProps {}

export const DivisionTable = () => {
  const tasks = useRef(createTasks()).current;
  return (
    <ArithmeticTableContainer
      title="Osztás"
      operation={Operation.Division}
      tasks={tasks}
    />
  );
};

export default DivisionTable;
