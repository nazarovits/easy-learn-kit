export type ResultStepStatus = 'success' | 'failure' | 'default';
export interface ResultStep {
    status: ResultStepStatus;
    position: number;
    task?: string;
    actualResult?: number;
    expectedResult?: number;
}