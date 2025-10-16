import { Substraction } from "@/components/Substraction";
import { createSubsctructionTasks } from "@/components/ArithmeticTable/tasks";
import { Params } from "@/components/utils/getRandomNumbersFromRanges";

const params: Params = {
  count: 10,
  ranges: [
    [1, 19],
    [1, 9],
  ],
};

const Page = () => {
  const tasks = createSubsctructionTasks(params);
  return <Substraction tasks={tasks} />;
};

export default Page;
