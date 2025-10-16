import { RelationType } from "@/components/RelationsTable/Tasks";

export type ResultStepType = "arithmetical" | "relations";
export type ResultStepStatus = "default" | "success" | "failure" | "timeout";
export type TaskResultType = number | string | RelationType;

export interface ResultStep {
  type?: ResultStepType;
  status: ResultStepStatus;
  position: number;
  task?: string;
  actualResult?: TaskResultType;
  expectedResult?: TaskResultType;
}
