import { createContext, PropsWithChildren, useContext, useState } from "react";

import { TaskSettings } from "./TaskSettings.types";

const storeTaskSettingsKey = "taskSettings";
const storeTaskSettings = (settings: TaskSettings) => {
  const strValue = JSON.stringify(settings);
  localStorage.setItem(storeTaskSettingsKey, strValue);
};
const retrieveTaskSettings = (): TaskSettings | null => {
  if (typeof localStorage === "undefined") {
    return null;
  }

  const strValue = localStorage.getItem(storeTaskSettingsKey);
  if (!strValue) {
    return null;
  }

  try {
    const settings = JSON.parse(strValue) as TaskSettings;
    return settings;
  } catch (e) {
    console.error("Failed to parse task settings from localStorage", e);
    return null;
  }
};

const createDefaultSettings = (): TaskSettings => ({
  count: 10,
  hasTimeLimit: false,
  timeLimitSeconds: 15,
  multiplicationTable: {
    enabledNumbers: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
    },
  },
});

const SettingsContext = createContext<{
  settings: TaskSettings;
  setSettings: (settings: TaskSettings) => void;
}>({
  settings: createDefaultSettings(),
  setSettings: () => {
    console.log("setSettings not implemented");
  },
});

export const useTaskSettings = () => {
  return useContext(SettingsContext);
};

export const TaskSettingsProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [settings, setSettings] = useState<TaskSettings>();

  return (
    <SettingsContext.Provider
      value={{
        settings: settings || retrieveTaskSettings() || createDefaultSettings(),
        setSettings: (value: TaskSettings) => {
          storeTaskSettings(value);
          setSettings(value);
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
