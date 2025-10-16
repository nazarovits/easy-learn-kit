import { areEqual } from "../areEqual";
import { getRandomInteger } from "../getRandomInteger";

/**
 * Generate `count` items where each item is an array of integers.
 * Each entry in `ranges` is a [min, max] tuple (inclusive).
 */

// getRandom(10, [[1,10], [2, 20]])
export interface Params {
  count: number;
  ranges: [number, number][];
  maxAttempts?: number; // default 1000
}

export type Result = number[][];

export const getRandomNumbersFromRanges = (params: Params): Result => {
  const { count, ranges, maxAttempts = 1000 } = params;
  if (count <= 0) return [];

  if (!Array.isArray(ranges) || ranges.length === 0) {
    throw new Error("ranges must be a non-empty array of [min, max] tuples");
  }

  const pickFromTuple = (tuple: [number, number]): number => {
    if (
      !Array.isArray(tuple) ||
      tuple.length !== 2 ||
      !Number.isFinite(tuple[0]) ||
      !Number.isFinite(tuple[1])
    ) {
      throw new Error("each range must be a [number, number] tuple");
    }
    let [min, max] = tuple;
    if (min > max) [min, max] = [max, min];
    return getRandomInteger(Math.floor(min), Math.floor(max));
  };

  const result = [] as Result;
  let attempts = 0;
  while (result.length < count) {
    attempts++;
    if (attempts > maxAttempts) {
      throw new Error(
        "Exceeded maximum attempts to generate unique random numbers. Please check the ranges and count."
      );
    }

    const numbers = ranges.map((tuple) => pickFromTuple(tuple));
    const hasDuplicate = result.some((item) => areEqual(item, numbers));

    if (hasDuplicate) {
      console.warn("Duplicate numbers found:", numbers);
      continue; // duplicate found, try again
    }

    result.push(numbers);
  }

  return result;
};

export default getRandomNumbersFromRanges;
