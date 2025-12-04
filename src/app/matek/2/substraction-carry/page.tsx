"use client";

import { useRef } from "react";

import { Params } from "@/components/utils/getRandomNumbersFromRanges";
import ArithmeticTable, {
  Operation,
  createSubstractionWithCarryTasks,
} from "@/components/ArithmeticTable";

const params: Params = {
  count: 10,
  ranges: [
    [10, 80],
    [10, 90],
  ],
};

const Page = () => {
  const tasks = useRef(createSubstractionWithCarryTasks(params)).current;

  return (
    <ArithmeticTable
      title="Kétjegyű számok kivonása tízesátlépéssel"
      operation={Operation.Substraction}
      tasks={tasks}
    />
  );
};

export default Page;
