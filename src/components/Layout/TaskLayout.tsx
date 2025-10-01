import { PropsWithChildren } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";

interface TaskLayoutProps {
  title: string;
  isStarted: boolean;
  onStartClick?: () => void;
  hasStartButton?: boolean;
}
export const TaskLayout = (props: PropsWithChildren<TaskLayoutProps>) => {
  const {
    title,
    children,
    isStarted = false,
    onStartClick = () => {},
    hasStartButton = true,
  } = props;

  return (
    <Container>
      <Col>
        <Row className="mt-4">
          <h2 className="text-center">{title}</h2>
        </Row>

        <Row>
          <Col className="text-center">
            {hasStartButton && !isStarted && (
              <Button variant="success" onClick={onStartClick}>
                Kezdés
              </Button>
            )}
            {isStarted && (
              <Button
                variant="secondary"
                onClick={() => window.location.reload()}
              >
                Újrakezdés
              </Button>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">{children}</Row>
      </Col>
    </Container>
  );
};

TaskLayout.dispalyName = "TaskLayout";

export default TaskLayout;
