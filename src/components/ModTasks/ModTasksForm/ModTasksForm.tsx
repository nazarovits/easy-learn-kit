import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ResultStepStatus, TaskResultType } from "@/components/ResultSteps";
import { shakeIt } from "@/ui/Animations";
import styles from "./ModTasksForm.module.css";

export interface ModTasksFormProps {
  number1: number;
  number2: number;
  expectedResult: TaskResultType;
  operationSymbol?: string;
  onSubmit: (result: {
    status: ResultStepStatus;
    actualResult: TaskResultType;
  }) => void;
}

export const ModTasksForm = (props: ModTasksFormProps) => {
  const {
    number1 = 3,
    number2 = 4,
    expectedResult = 12,
    operationSymbol = "&Cross;",
    onSubmit,
  } = props;
  const inputCeilRef = useRef<HTMLInputElement>(null);
  const inputModRef = useRef<HTMLInputElement>(null);
  const [isCeilInvalid, setIsCeilInvalid] = useState(false);
  const [isModInvalid, setIsModInvalid] = useState(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const ceilValue = inputCeilRef.current?.value || "";
    const modValue = inputModRef.current?.value || "";
    if (ceilValue === "" || modValue === "") {
      if (ceilValue === "") {
        shakeIt(inputCeilRef.current!);
        inputCeilRef.current?.focus();
        setIsCeilInvalid(true);
      } else {
        shakeIt(inputModRef.current!);
        inputModRef.current?.focus();
        setIsModInvalid(true);
      }
      return;
    }

    setIsCeilInvalid(false);
    setIsModInvalid(false);

    const actualResult = `${ceilValue} (${modValue})`;
    if (actualResult !== expectedResult) {
      onSubmit({ status: "failure", actualResult });
    } else {
      onSubmit({ status: "success", actualResult });
    }
    inputCeilRef.current!.value = ""; // clear the input field
    inputModRef.current!.value = ""; // clear the input field
    inputCeilRef.current!.focus();
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
            isInvalid={isCeilInvalid}
            ref={inputCeilRef}
            onFocus={() => setIsCeilInvalid(false)}
            onKeyDown={() => setIsCeilInvalid(false)}
            className={styles.numberInput}
            type="number"
            name="ceil"
            autoComplete="off"
          />
          <span className={styles.number}>{"("}</span>
          <Form.Control
            isInvalid={isModInvalid}
            ref={inputModRef}
            onFocus={() => setIsModInvalid(false)}
            onKeyDown={() => setIsModInvalid(false)}
            className={styles.numberInput}
            type="number"
            name="mod"
            autoComplete="off"
          />
          <span className={styles.number}>{")"}</span>
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
