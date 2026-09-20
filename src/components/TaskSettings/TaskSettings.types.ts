export interface MultiplicationTableNumbers {
  0: boolean;
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
  5: boolean;
  6: boolean;
  7: boolean;
  8: boolean;
  9: boolean;
  10: boolean;
}
/*
 * Defines the types for Task Settings used in the TaskSettingsContext.
 */
export interface TaskSettings {
  count: number;
  hasTimeLimit: boolean;
  timeLimitSeconds: number;
  multiplicationTable: {
    enabledNumbers: MultiplicationTableNumbers;
  };
}
