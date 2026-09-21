"use client";

import { useRef } from "react";

import { colorItems } from "@/sources/en-colors";
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
  const huColors: Record<string, string> = colorItems.reduce(
    (prev, { en, hu }) => {
      prev[hu] = en;
      return prev;
    },
    {} as Record<string, string>,
  );

  const tasks = useRef(createTasksFromDictionary(huColors)).current;

  return <TypePairsTable title="Írd be a szín megnevezését!" tasks={tasks} />;
};

export default Page;
