import { Task, Tasks } from "../TypePairsTable";

export const shuffleTasks = (tasks: Tasks): Tasks => {
  const shuffled = [...tasks];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const createTasksFromDictionary = (
  dictionary: Record<string, string>,
): Tasks => {
  const tasks: Tasks = Object.entries(dictionary).map(([key, value]) => ({
    fieldName: key,
    fieldValue: value,
    expectedResult: value,
  }));

  const shuffledTasks = shuffleTasks(tasks);
  return shuffledTasks;
};
