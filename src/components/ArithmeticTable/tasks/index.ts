import { Tasks } from "@/components/ArithmeticTable";
import {
  getRandomNumbersFromRanges,
  Params,
} from "@/components/utils/getRandomNumbersFromRanges";
import { get } from "http";

export const createAdditionTasks = (params: Params): Tasks => {
  const numbers = getRandomNumbersFromRanges(params);
  const tasks: Tasks = numbers.map((pair) => {
    const [number1, number2] = pair;
    const sum = number1 + number2;

    return {
      number1,
      number2,
      expectedResult: sum,
    };
  });

  return tasks;
};

export const createSubsctructionTasks = (params: Params): Tasks => {
  const numbers = getRandomNumbersFromRanges(params);
  const tasks: Tasks = numbers.map((pair) => {
    const [number1, number2] = pair;
    const sum = number1 + number2;

    return {
      number1: sum,
      number2,
      expectedResult: number1,
    };
  });

  return tasks;
};

export const createMultiplicationTasks = (params: Params): Tasks => {
  const numbers = getRandomNumbersFromRanges(params);
  const tasks: Tasks = numbers.map((pair) => {
    const [number1, number2] = pair;
    const expectedResult = number1 * number2;

    return {
      number1,
      number2,
      expectedResult,
    };
  });

  return tasks;
};

export const createDivisionTasks = (params: Params): Tasks => {
  const numbers = getRandomNumbersFromRanges(params);
  const tasks: Tasks = numbers.map((pair) => {
    const [number1, number2] = pair;
    const mult = number1 * number2;

    return {
      number1: mult,
      number2,
      expectedResult: number1,
    };
  });

  return tasks;
};
