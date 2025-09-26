import { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";

interface TaskLayoutProps {
  title: string;
  isStarted: boolean;
  onStartClick: () => void;
}
export const TaskLayout = (props: PropsWithChildren<TaskLayoutProps>) => {
  const { title, isStarted, onStartClick, children } = props;

  return (
    <div className="container">
      <h2>{title}</h2>

      {!isStarted && (
        <div className="">
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
