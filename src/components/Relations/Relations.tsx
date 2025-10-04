"use client";

import { useRef } from "react";
import RelationsTable from "@/components/RelationsTable";
import { RelationsTableProps } from "@/components/RelationsTable";

export interface RelationsProps extends Pick<RelationsTableProps, "tasks"> {
  // other props
}

export const Relations = (props: RelationsProps) => {
  const tasks = useRef(props.tasks).current;

  return <RelationsTable title="Hasonlítsd össze!" tasks={tasks} />;
};

export default Relations;
