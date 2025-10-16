/**
 * Returns a boolean value indicating whether the two arguments are deeply equal.
 */
export const areEqual = <T>(a: T, b: T): boolean => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;

  return JSON.stringify(a) === JSON.stringify(b);
};

export default areEqual;
