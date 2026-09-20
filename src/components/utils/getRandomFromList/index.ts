export const getRandomFromList = <T>(list: T[]): T => {
  if (list.length === 0) {
    console.error("getRandomFromList called with empty list", list);
  }

  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

export default getRandomFromList;
