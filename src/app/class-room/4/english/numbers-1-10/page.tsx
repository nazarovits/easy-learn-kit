"use client";

import { useRef } from "react";

import { enNumbers_1_10 } from "@/sources/en-numbers";
import { createTasksFromDictionary } from "@/components/TypePairsTable/tasks";
import { Params } from "@/components/utils/getRandomNumbersFromRanges";

import TypePairsTable from "@/components/TypePairsTable/TypePairsTable";

const params: Params = {
  count: 10,
  ranges: [
    [1, 10],
    [1, 10],
  ],
};

const Page = () => {
  const huNumbers: Record<string, string> = enNumbers_1_10.reduce(
    (prev, { en, hu }) => {
      prev[hu] = en;
      return prev;
    },
    {} as Record<string, string>,
  );

  const tasks = useRef(createTasksFromDictionary(huNumbers)).current;

  return <TypePairsTable title="Írd be a szám megnevezését!" tasks={tasks} />;
};

export default Page;
