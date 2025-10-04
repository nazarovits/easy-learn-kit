import Relations from "@/components/Relations";
import { createListWithNumbers } from "@/components/utils";
import { getNumbersToCompare } from "@/components/utils/getNumbersToCompare";
import {
  Task,
  getExpectedRelationType,
} from "@/components/RelationsTable/Tasks";

const taskCount = 10;
const crateTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map(() => {
    const [number1, number2] = getNumbersToCompare();
    const expectedResult = getExpectedRelationType(number1, number2);

    return {
      number1,
      number2,
      expectedResult,
    };
  });

  return tasks;
};

const Page = () => {
  const tasks = crateTasks();

  console.log("initial tasks", tasks);
  return <Relations tasks={tasks} />;
};

export default Page;
