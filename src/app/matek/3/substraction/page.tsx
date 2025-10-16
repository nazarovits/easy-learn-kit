"use client";

import { useRef } from "react";

import { Params } from "@/components/utils/getRandomNumbersFromRanges";
import ArithmeticTable, {
  Operation,
  createSubsctructionTasks,
} from "@/components/ArithmeticTable";

const params: Params = {
  count: 10,
  ranges: [
    [2, 21],
    [2, 79],
  ],
};

const Page = () => {
  const tasks = useRef(createSubsctructionTasks(params)).current;
  return (
    <ArithmeticTable
      title="Kivonás"
      operation={Operation.Substraction}
      tasks={tasks}
    />
  );
};

export default Page;
