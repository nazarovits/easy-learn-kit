import {
  getRandomNumbersFromRanges,
  Params,
} from "@/components/utils/getRandomNumbersFromRanges";
import { Tasks } from "@/components/ArithmeticTable";

/*
 * Creates addition tasks where each task involves adding two numbers.
 * @param params - Parameters defining the number ranges and count of tasks.
 * @returns An array of addition tasks.
 */
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

/*
 * Creates addition tasks where each task involves adding two two-digit numbers
 * that result in a carry (i.e., the sum of the units digits is 10 or more).
 */
export const createAdditionWithCarryTasks = (params: Params): Tasks => {
  const { count } = params;
  const validUnits: [number, number][] = [];

  // Precompute all unit digit pairs (0-9) where sum >= 10
  for (let u1 = 0; u1 <= 9; u1++) {
    for (let u2 = 0; u2 <= 9; u2++) {
      if (u1 + u2 >= 10) validUnits.push([u1, u2]);
    }
  }

  // Helper to generate a random two-digit number with a specific units digit
  const randomTwoDigitWithUnits = (units: number): number => {
    const tens = Math.floor(Math.random() * 9) + 1; // tens digit 1-9
    return tens * 10 + units;
  };

  const tasks: Tasks = [];
  while (tasks.length < count) {
    // Pick a valid units digit pair
    const [u1, u2] = validUnits[Math.floor(Math.random() * validUnits.length)];
    const number1 = randomTwoDigitWithUnits(u1);
    const number2 = randomTwoDigitWithUnits(u2);
    const sum = number1 + number2;
    if (sum < 100) {
      tasks.push({
        number1,
        number2,
        expectedResult: sum,
      });
    }
  }

  return tasks;
};

/*
 * Creates subtraction tasks where each task involves subtracting two numbers.
 * @param params - Parameters defining the number ranges and count of tasks.
 * @returns An array of subtraction tasks.
 */
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

/*
 * Creates multiplication tasks where each task involves multiplying two numbers.
 * @param params - Parameters defining the number ranges and count of tasks.
 * @returns An array of multiplication tasks.
 */
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

/*
 * Creates division tasks where each task involves dividing two numbers.
 * @param params - Parameters defining the number ranges and count of tasks.
 * @returns An array of division tasks.
 */
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
