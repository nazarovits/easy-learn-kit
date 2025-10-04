import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ResultStepStatus } from "@/components/ResultSteps";
import { shakeIt } from "@/ui/Animations";
import { RelationType } from "@/components/RelationsTable/Tasks";
import styles from "./RelationsTableForm.module.css";

export interface RelationsTableFormProps {
  number1: number;
  number2: number;
  expectedResult: RelationType;
  onSubmit: (result: {
    status: ResultStepStatus;
    actualResult: RelationType;
  }) => void;
}

export const RelationsTableForm = (props: RelationsTableFormProps) => {
  const [value, setValue] = useState<RelationType>("");
  const { number1 = 3, number2 = 4, expectedResult = 12, onSubmit } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    //const value = inputRef.current?.value || "";
    if (value === "") {
      setIsInvalid(true);
      shakeIt(inputRef.current!);
      //inputRef.current?.focus();
      return;
    }

    setIsInvalid(false);

    const actualResult = value;
    if (actualResult !== expectedResult) {
      onSubmit({ status: "failure", actualResult });
    } else {
      onSubmit({ status: "success", actualResult });
    }
    setValue(""); // clear the input field
  };

  return (
    <Row className="justify-content-center">
      <Col style={{ width: "240px", maxWidth: "400px" }}>
        <Form onSubmit={onFormSubmit}>
          <Row className="mt-4 text-center">
            <Col className="align-content-center">
              <span className={styles.number}>{number1}</span>
            </Col>

            <Col className="align-content-center">
              <Form.Control
                readOnly={true}
                disabled={true}
                isInvalid={isInvalid}
                ref={inputRef}
                className={styles.numberInput}
                type="text"
                name="result"
                autoComplete="off"
                value={value}
              />
              <Form.Control.Feedback type="invalid">
                Kérlek írd be a választ!
              </Form.Control.Feedback>
            </Col>

            <Col className="align-content-center">
              <span className={styles.number}>{number2}</span>
            </Col>
          </Row>

          <Row className="mt-4 text-center justify-content-center">
            <Col>
              <Row style={{ maxWidth: "240px", margin: "0 auto" }}>
                <Col>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setValue("<")}
                  >
                    {"<"}
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setValue("=")}
                  >
                    {"="}
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setValue(">")}
                  >
                    {">"}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="mt-4 text-center">
            <Col>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                style={{
                  width: "240px",
                }}
              >
                OK
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
