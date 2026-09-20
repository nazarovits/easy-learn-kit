"use client";

import { useRef } from "react";

import { Params } from "@/components/utils/getRandomNumbersFromRanges";
import ArithmeticTable, {
  Operation,
  createMultiplicationTasks,
} from "@/components/ArithmeticTable";
import { useTaskSettings } from "@/components/TaskSettings";

const Page = () => {
  const taskSettings = useTaskSettings();
  const multiplicationNumbers =
    taskSettings.settings.multiplicationTable.enabledNumbers;

  const filterIncludedNumbers = (key: string) => {
    return (
      multiplicationNumbers[
        Number(key) as keyof typeof multiplicationNumbers
      ] === true
    );
  };

  const keys = Object.keys(multiplicationNumbers);
  const filtered = keys.filter(filterIncludedNumbers);
  const range1 = filtered.map((key) => Number(key));
  const params: Params = {
    count: 10,
    args: [
      {
        include: range1.length ? range1 : [1, 2, 10],
      },
      {
        range: [2, 9],
      },
    ],
    maxAttempts: 1000,
  };

  const tasks = useRef(createMultiplicationTasks(params)).current;

  return (
    <ArithmeticTable
      title="Szorzás"
      operation={Operation.Multiplication}
      tasks={tasks}
    />
  );
};

export default Page;
