import { JSX, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { ResultStepStatus } from "@/components/ResultSteps";
import { shakeIt } from "@/ui/Animations";
import IconButton from "@/ui/IconButton";

import styles from "./TypePairsForm.module.css";

/**
 * Returns a random integer between min and max (inclusive).
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer between min and max
 */
export function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Parameters for getRandomNumbersFromRanges.
 */
export interface GetRandomNumbersFromRangesParams {
  count: number;
  ranges: [number, number][];
}

/**
 * Returns a list of unique random number arrays, each array generated from the provided ranges.
 * @param params - Object containing count and ranges
 * @returns Array of number arrays
 */
export function getRandomNumbersFromRanges(
  params: GetRandomNumbersFromRangesParams,
): number[][] {
  const { count, ranges } = params;
  const seen = new Set<string>();
  const result: number[][] = [];
  while (result.length < count) {
    const nums = ranges.map(([min, max]) => getRandomInteger(min, max));
    const key = nums.join("|");
    if (!seen.has(key)) {
      seen.add(key);
      result.push(nums);
    }
  }
  return result;
}

/**
 * Checks if two arrays of numbers are equal.
 * @param a - First array
 * @param b - Second array
 * @returns True if arrays are equal, false otherwise
 */
export function areEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

/**
 * Creates a list of numbers from start to end (inclusive).
 * @param start - Start value
 * @param end - End value
 * @returns Array of numbers from start to end
 */
export function createListWithNumbers(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * Props for ArithmeticTableForm component.
 */
export interface TypePairsFormProps {
  fieldName: string;
  fieldValue: string;
  /** Expected result of the operation */
  expectedResult: string;
  /** Callback when form is submitted */
  onSubmit: (result: {
    status: ResultStepStatus;
    actualResult: string;
  }) => void;
}

/**
 * ArithmeticTableForm component for math exercises.
 */
export const TypePairsForm = (props: TypePairsFormProps): JSX.Element => {
  const { fieldName, expectedResult, onSubmit } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    const value: string = inputRef.current?.value || "";
    if (value === "") {
      setIsInvalid(true);
      shakeIt(inputRef.current!);
      return;
    }

    setIsInvalid(false);

    const actualResult: string = value.trim();
    if (actualResult !== expectedResult) {
      onSubmit({ status: "failure", actualResult });
    } else {
      onSubmit({ status: "success", actualResult });
    }
    inputRef.current!.value = "";
    inputRef.current!.focus();
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Row className="mt-4 text-center">
        <Col>
          <span className={styles.fieldName}>{fieldName}</span>
          <span className={styles.fieldName}>{"<->"}</span>

          <Form.Control
            isInvalid={isInvalid}
            ref={inputRef}
            onFocus={() => setIsInvalid(false)}
            onKeyDown={() => setIsInvalid(false)}
            className={styles.numberInput}
            type="text"
            name="result"
            size="sm"
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            Kérlek írd be a választ!
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mt-4 text-center">
        <Col>
          <IconButton
            iconType="check"
            aria-label="Beküldés"
            variant="primary"
            type="submit"
            btnSize="lg"
            style={{
              display: "inline",
            }}
          >
            OK
          </IconButton>
        </Col>
      </Row>
    </Form>
  );
};

export default TypePairsForm;
