"use client";

import { useRef } from "react";

import { getRandomInteger } from "@/components/utils/getRandomInteger";
import { createListWithNumbers } from "@/components/utils";
import ArithmeticTable, { Operation, Task } from "@/components/ArithmeticTable";

const taskCount = 10;
const createTasks = (): Task[] => {
  const items = createListWithNumbers(taskCount);
  const tasks = items.map((_) => {
    const number1 = getRandomInteger(2, 21);
    const number2 = getRandomInteger(2, 79);

    const total = number1 + number2;

    return {
      number1: total,
      number2,
      expectedResult: number1,
    };
  });

  return tasks;
};

export interface SubstractionProps {
  tasks?: Task[];
}

export const Substraction = (props: SubstractionProps = {}) => {
  const tasks = useRef(props.tasks || createTasks()).current;

  return (
    <ArithmeticTable
      title="Kivonás"
      operation={Operation.Subtraction}
      tasks={tasks}
    />
  );
};

export default Substraction;
