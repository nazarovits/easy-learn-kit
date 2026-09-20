"use client";

import { useRef } from "react";
import ArithmeticTable, {
  Operation,
  createDivisionTasks,
} from "@/components/ArithmeticTable";
import { Params } from "@/components/utils/getRandomNumbersFromRanges";

const params: Params = {
  count: 10,
  ranges: [
    [2, 9],
    [2, 9],
  ],
};

const Page = () => {
  const tasks = useRef(createDivisionTasks(params)).current;
  return (
    <ArithmeticTable
      title="Osztás"
      operation={Operation.Division}
      tasks={tasks}
    />
  );
};

export default Page;
