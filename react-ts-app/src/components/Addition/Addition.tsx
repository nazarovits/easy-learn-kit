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
    //const number1 = getRandomInteger(1, 10);
    //const number2 = getRandomInteger(0, 10);

    const sum = number1 + number2;

    return {
      number1,
      number2,
      expectedResult: sum,
    };
  });

  return tasks;
};

export interface AdditionProps {
  tasks?: Task[];
}
export const Addition = (props: AdditionProps = {}) => {
  const tasks = useRef(props?.tasks || createTasks()).current;

  return (
    <ArithmeticTableContainer
      title="Összeadás"
      operation={Operation.Addition}
      tasks={tasks}
    />
  );
};

export default Addition;
