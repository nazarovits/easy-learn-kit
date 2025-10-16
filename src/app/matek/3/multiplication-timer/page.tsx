"use client";

import { useRef } from "react";

import { Params } from "@/components/utils/getRandomNumbersFromRanges";
import ArithmeticTable, {
  Operation,
  createMultiplicationTasks,
} from "@/components/ArithmeticTable";

const params: Params = {
  count: 10,
  ranges: [
    [2, 9],
    [2, 9],
  ],
};

const Page = () => {
  const tasks = useRef(createMultiplicationTasks(params)).current;

  return (
    <ArithmeticTable
      title="Szorzás"
      operation={Operation.Multiplication}
      tasks={tasks}
      hasTimer={true}
    />
  );
};

export default Page;
