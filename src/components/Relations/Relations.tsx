"use client";

import { useRef } from "react";
import RelationsTable from "@/components/RelationsTable";
import { Task } from "@/components/RelationsTable/Tasks";

export interface RelationsProps {
  tasks: Task[];
}

export const Relations = (props: RelationsProps) => {
  const tasks = useRef(props.tasks).current;

  return <RelationsTable title="Hasonlítsd össze!" tasks={tasks} />;
};

export default Relations;
