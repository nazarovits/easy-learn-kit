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
  const { count, ranges } = params;
  // ranges: [[min1, max1], [min2, max2]]
  const [range1, range2] = ranges;
  const [min1, max1] = range1;
  const [min2, max2] = range2;

  const validUnits: [number, number][] = [];
  // Precompute all unit digit pairs (0-9) where sum >= 10
  for (let u1 = 0; u1 <= 9; u1++) {
    for (let u2 = 0; u2 <= 9; u2++) {
      if (u1 + u2 >= 10) validUnits.push([u1, u2]);
    }
  }

  // Helper to generate a random number in [min, max] with a specific units digit
  const randomWithUnits = (min: number, max: number, units: number): number => {
    // Find all numbers in [min, max] with the given units digit
    const candidates: number[] = [];
    for (let n = min; n <= max; n++) {
      if (n % 10 === units) candidates.push(n);
    }
    // Pick one randomly
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  const tasks: Tasks = [];
  while (tasks.length < count) {
    // Pick a valid units digit pair
    const [u1, u2] = validUnits[Math.floor(Math.random() * validUnits.length)];
    const number1 = randomWithUnits(min1, max1, u1);
    const number2 = randomWithUnits(min2, max2, u2);
    const sum = number1 + number2;
    if (sum < 100 && !isNaN(number1) && !isNaN(number2)) {
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
 * Creates subtraction tasks that require borrowing (i.e., the units digit of the minuend is less than that of the subtrahend).
 * @param params - Parameters defining the number ranges and count of tasks.
 * @returns An array of subtraction tasks requiring borrowing.
 */
export const createSubstractionWithCarryTasks = (params: Params): Tasks => {
  const { count, ranges } = params;
  // ranges: [[min1, max1], [min2, max2]]
  const [range1, range2] = ranges;
  const [min1, max1] = range1;
  const [min2, max2] = range2;

  const tasks: Tasks = [];
  while (tasks.length < count) {
    const number2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
    // number1 legyen nagyobb, de max max1
    const minNumber1 = Math.max(number2 + 1, min1);
    const maxNumber1 = max1;
    if (minNumber1 > maxNumber1) continue;
    const number1 =
      Math.floor(Math.random() * (maxNumber1 - minNumber1 + 1)) + minNumber1;

    // Tízesátlépés: az egyesek helyén a kivonandó nagyobb, mint a kivonandó egyesek
    if (number1 % 10 < number2 % 10) {
      tasks.push({
        number1,
        number2,
        expectedResult: number1 - number2,
      });
    }
  }
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
