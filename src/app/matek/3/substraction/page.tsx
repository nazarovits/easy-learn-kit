import { Substraction } from "@/components/Substraction";
import { createSubsctructionTasks } from "@/components/ArithmeticTable/tasks";
import { Params } from "@/components/utils/getRandomNumbersFromRanges";

const params: Params = {
  count: 10,
  ranges: [
    [2, 21],
    [2, 79],
  ],
};

const Page = () => {
  const tasks = createSubsctructionTasks(params);
  return <Substraction tasks={tasks} />;
};

export default Page;
