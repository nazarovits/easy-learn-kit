export function getNumbersToCompare(): [number, number] {
  // Generate a random 3-digit number (100-999)
  const num1 = Math.floor(Math.random() * 900) + 100;
  // Convert to array of digits
  const digits = num1.toString().split("");
  // Shuffle the digits for num2
  const shuffled = [...digits];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const num2 = parseInt(shuffled.join(""), 10);
  return [num1, num2];
}
