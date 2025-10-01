import { Substraction } from "@/components/Substraction";
import { Task } from "@/components/ArithmeticTable";
import { createListWithNumbers } from "@/components/utils";
import { getRandomInteger } from "@/components/utils/getRandomInteger";

const taskCount = 10;
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

export default () => {
  const tasks = createSubsctructionTasks();
  return <Substraction tasks={tasks} />;
};
