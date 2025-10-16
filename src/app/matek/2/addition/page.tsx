import { Addition } from "@/components/Addition";
import { createAdditionTasks } from "@/components/ArithmeticTable/tasks";
import { Params } from "@/components/utils/getRandomNumbersFromRanges";

const params: Params = {
  count: 10,
  ranges: [
    [1, 10],
    [0, 10],
  ],
};

const Page = () => {
  const tasks = createAdditionTasks(params);
  return <Addition tasks={tasks} />;
};

export default Page;
