import { areEqual } from "../areEqual";
import { getRandomInteger } from "../getRandomInteger";
import { getRandomFromList } from "../getRandomFromList";

export interface ArgumentRange {
  range: [number, number];
}

export interface ArgumentInclude {
  include: number[];
}

export type ArgumentSettings = ArgumentRange | ArgumentInclude;

/**
 * Generate `count` items where each item is an array of integers.
 * Each entry in `ranges` is a [min, max] tuple (inclusive).
 */
export interface Params {
  count: number;
  /**
   * @deprecated Use args with ArgumentSettings
   * */
  ranges?: [number, number][];
  exclude?: number[];
  maxAttempts?: number; // default 1000
  args?: ArgumentSettings[];
}

export type Result = number[][];

export const getRandomNumbersFromRanges = (params: Params): Result => {
  const { count, ranges, maxAttempts = 1000 } = params;
  if (count <= 0) return [];

  if ("args" in params) {
    // TODO: Temp solution to avoid errors in multiplication tasks
    return getRandomNumbersFromArgsSettings(params);
    //throw new Error("ranges must be a non-empty array of [min, max] tuples");
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

  if (!Array.isArray(ranges) || ranges.length === 0) {
    throw new Error("ranges must be a non-empty array of [min, max] tuples");
  }

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

export const getRandomNumbersFromArgsSettings = (params: Params): Result => {
  const { count, args, maxAttempts = 1000 } = params;
  if (count <= 0) return [];

  if (!Array.isArray(args) || args.length === 0) {
    throw new Error("args must be a non-empty array of ArgumentSettings");
  }

  const result = [] as Result;
  let attempts = 0;
  while (result.length < count) {
    attempts++;
    if (attempts > maxAttempts) {
      throw new Error(
        "Exceeded maximum attempts to generate unique random numbers. Please check the ranges and count."
      );
    }

    const numbers = args.map((argSettings) => {
      if ("range" in argSettings) {
        const [min, max] = argSettings.range;
        return getRandomInteger(Math.floor(min), Math.floor(max));
      } else if ("include" in argSettings) {
        const includeArray = argSettings.include;
        return getRandomFromList(includeArray);
      } else {
        throw new Error("Unhandled ArgumentSettings object", argSettings);
      }
    });

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
