import { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";

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
    hasStartButton = false,
  } = props;

  return (
    <div className="container">
      <h2 className="mt-4">{title}</h2>

      {hasStartButton && !isStarted && (
        <div>
          <Button className="btn btn-success" onClick={onStartClick}>
            Kezdés
          </Button>
        </div>
      )}

      {isStarted && (
        <div className="row mt-3">
          <div className="col">
            <Button
              type="submit"
              variant="secondary"
              className="btn"
              onClick={() => window.location.reload()}
            >
              Újrakezdés
            </Button>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default TaskLayout;
