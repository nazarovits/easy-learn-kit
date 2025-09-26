export const getRandomWords = (words: string[], count: number): string[] => {
  const shuffled = words.sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, count); // Get sub-array of first n elements after shuffle
};
