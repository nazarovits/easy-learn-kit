import { Addition } from "@/components/Addition";
import { Task } from "@/components/ArithmeticTable";
import { createListWithNumbers } from "@/components/utils";
import { getRandomInteger } from "@/components/utils/getRandomInteger";

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

export default () => {
  const tasks = createAdditionTasks();
  return <Addition tasks={tasks} />;
};
