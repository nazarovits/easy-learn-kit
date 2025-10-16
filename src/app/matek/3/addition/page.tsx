import { Addition } from "@/components/Addition";
import { createAdditionTasks } from "@/components/ArithmeticTable/tasks";
import { Params } from "@/components/utils/getRandomNumbersFromRanges";

const params: Params = {
  count: 10,
  ranges: [
    [2, 21],
    [2, 79],
  ],
};

const Page = () => {
  const tasks = createAdditionTasks(params);
  return <Addition tasks={tasks} />;
};

export default Page;
