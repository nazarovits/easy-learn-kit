import { Substraction } from "@/components/Substraction";
import { Task } from "@/components/ArithmeticTable";
import { createListWithNumbers } from "@/components/utils";
import { getRandomInteger } from "@/components/utils/getRandomInteger";

const taskCount = 10;
const createSubsctructionTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map(() => {
    const number1 = getRandomInteger(2, 21);
    const number2 = getRandomInteger(2, 79);

    const total = number1 + number2;

    return {
      number1: total,
      number2,
      expectedResult: number1,
    };
  });

  return tasks;
};

const Page = () => {
  const tasks = createSubsctructionTasks();
  return <Substraction tasks={tasks} />;
};

export default Page;
