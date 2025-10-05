"use client";

import { useRef } from "react";

import { getRandomInteger } from "@/components/utils/getRandomInteger";
import { createListWithNumbers } from "@/components/utils";
import ModTasks, { Task } from "@/components/ModTasks";

const taskCount = 10;

const createTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map(() => {
    const number1 = getRandomInteger(2, 9);
    const number2 = getRandomInteger(2, 9);
    const mod = getRandomInteger(0, number2);

    const mult = number1 * number2 + mod;

    return {
      number1: mult,
      number2,
      expectedResult: `${number1} (${mod})`,
      expectedCeil: number1,
      expectedMod: mod,
    };
  });

  return tasks;
};

const Page = () => {
  const tasks = useRef(createTasks()).current;
  return <ModTasks tasks={tasks} />;
};

export default Page;
