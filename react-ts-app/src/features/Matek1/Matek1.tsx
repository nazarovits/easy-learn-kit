import { Addition } from "../../components/Addition";
import { Task } from "../../components/ArithmeticTable";
import Substraction from "../../components/Substraction";
import { createListWithNumbers } from "../../components/utils";
import { getRandomInteger } from "../../components/utils/getRandomInteger";

const taskCount = 10;
const createAdditionTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map((_) => {
    const number1 = getRandomInteger(1, 10);
    const number2 = getRandomInteger(0, 10);

    const sum = number1 + number2;

    return {
      number1,
      number2,
      expectedResult: sum,
    };
  });

  return tasks;
};

const createSubsctructionTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map((_) => {
    const number1 = getRandomInteger(1, 19);
    const number2 = getRandomInteger(1, 9);

    const total = number1 + number2;

    return {
      number1: total,
      number2,
      expectedResult: number1,
    };
  });

  return tasks;
};

export const Addition1 = () => {
  const tasks = createAdditionTasks();
  return <Addition tasks={tasks} />;
};

export const Substraction1 = () => {
  const tasks = createSubsctructionTasks();
  return <Substraction tasks={tasks} />;
};
