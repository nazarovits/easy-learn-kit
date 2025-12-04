"use client";

import { useRef } from "react";

import { Params } from "@/components/utils/getRandomNumbersFromRanges";
import ArithmeticTable, {
  Operation,
  createAdditionWithCarryTasks,
} from "@/components/ArithmeticTable";

const params: Params = {
  count: 10,
  ranges: [
    [1, 10],
    [1, 10],
  ],
};

const Page = () => {
  const tasks = useRef(createAdditionWithCarryTasks(params)).current;

  return (
    <ArithmeticTable
      title="Teljes kétjegyű számok összeadása tízesátlépéssel"
      operation={Operation.Addition}
      tasks={tasks}
    />
  );
};

export default Page;
