"use client";

import { useRef } from "react";

import { Params } from "@/components/utils/getRandomNumbersFromRanges";
import ArithmeticTable, {
  Operation,
  createAdditionTasks,
} from "@/components/ArithmeticTable";

const params: Params = {
  count: 10,
  ranges: [
    [2, 27],
    [2, 79],
  ],
};

const Page = () => {
  const tasks = useRef(createAdditionTasks(params)).current;

  return (
    <ArithmeticTable
      title="Összeadás"
      operation={Operation.Addition}
      tasks={tasks}
    />
  );
};

export default Page;
