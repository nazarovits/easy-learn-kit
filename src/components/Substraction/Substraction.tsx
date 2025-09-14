import { useRef } from "react";

import { getRandomInteger } from "../utils/getRandomInteger";
import { createListWithNumbers } from "../utils";
import ArithmeticTableContainer, { Operation, Task } from "../ArithmeticTable";

const taskCount = 10;
const createTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map((_) => {
    const number1 = getRandomInteger(2, 21);
    const number2 = getRandomInteger(2, 79);
    //const number1 = getRandomInteger(1, 19);
    //const number2 = getRandomInteger(11, 29);

    const total = number1 + number2;

    return {
      number1: total,
      number2,
      expectedResult: number1,
    };
  });

  return tasks;
};

export const Substraction = () => {
  const tasks = useRef(createTasks()).current;

  return (
    <ArithmeticTableContainer
      title="Kivonás"
      operation={Operation.Subtraction}
      tasks={tasks}
    />
  );
};

export default Substraction;
