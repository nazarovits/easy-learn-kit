import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ResultStepStatus } from "@/components/ResultSteps";
import { shakeIt } from "@/ui/Animations";
import styles from "./ArithmeticTableForm.module.css";

export interface ArithmeticTableFormProps {
  number1: number;
  number2: number;
  expectedResult: number;
  operationSymbol?: string;
  onSubmit: (result: {
    status: ResultStepStatus;
    actualResult: number;
  }) => void;
}

export const ArithmeticTableForm = (props: ArithmeticTableFormProps) => {
  const {
    number1 = 3,
    number2 = 4,
    expectedResult = 12,
    operationSymbol = "&Cross;",
    onSubmit,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const value = inputRef.current?.value || "";
    if (value === "") {
      setIsInvalid(true);
      shakeIt(inputRef.current!);
      //inputRef.current?.focus();
      return;
    }

    setIsInvalid(false);

    const actualResult = parseInt(value);
    if (actualResult !== expectedResult) {
      onSubmit({ status: "failure", actualResult });
    } else {
      onSubmit({ status: "success", actualResult });
    }
    inputRef.current!.value = ""; // clear the input field
    inputRef.current!.focus();
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Row className="mt-4 text-center">
        <Col>
          <span className={styles.number}>{number1}</span>
          <span
            className={styles.number}
            dangerouslySetInnerHTML={{
              __html: operationSymbol,
            }}
          ></span>
          <span className={styles.number}>{number2}</span>
          <span className={styles.number}>=</span>

          <Form.Control
            isInvalid={isInvalid}
            ref={inputRef}
            onFocus={() => setIsInvalid(false)}
            onKeyDown={() => setIsInvalid(false)}
            className={styles.numberInput}
            type="number"
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
          <Button type="submit" variant="primary" size="lg">
            OK
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
