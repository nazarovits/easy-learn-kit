import { useRef } from "react";

import { getRandomInteger } from "../utils/getRandomInteger";
import { createListWithNumbers } from "../utils";
import ArithmeticTableContainer, { Operation, Task } from "../ArithmeticTable";

const taskCount = 10;
const createTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map((_) => {
    const number1 = getRandomInteger(2, 10);
    const number2 = getRandomInteger(2, 10);
    //const number1 = getRandomInteger(1, 19);
    //const number2 = getRandomInteger(11, 29);

    const sum = number1 + number2;

    return {
      number1,
      number2,
      expectedResult: sum,
    };
  });

  return tasks;
};

export const Addition = () => {
  const tasks = useRef(createTasks()).current;

  return (
    <ArithmeticTableContainer
      title="Összeadás"
      operation={Operation.Addition}
      tasks={tasks}
    />
  );
};

export default Addition;
