"use client";

import { useRef } from "react";

import { getRandomInteger } from "@/components/utils/getRandomInteger";
import { createListWithNumbers } from "@/components/utils";
import ArithmeticTable, { Operation, Task } from "@/components/ArithmeticTable";

const taskCount = 10;
const createTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map(() => {
    const number1 = getRandomInteger(2, 9);
    const number2 = getRandomInteger(2, 9);
    const expectedResult = number1 * number2;

    return {
      number1,
      number2,
      expectedResult,
    };
  });

  return tasks;
};

const Page = () => {
  const tasks = useRef(createTasks()).current;

  return (
    <ArithmeticTable
      title="Szorzás"
      operation={Operation.Multiplication}
      tasks={tasks}
    />
  );
};

export default Page;
