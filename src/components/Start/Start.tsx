import { Button } from "react-bootstrap";

export interface StartProps {
  title: string;
  onStart: () => void;
}

export const Start = (props: StartProps) => {
  const { title, onStart } = props;

  return (
    <div className="container">
      <h2>{title}</h2>
      <div className="">
        <Button className="btn btn-success" onClick={onStart}>
          Kezdés
        </Button>
      </div>
    </div>
  );
};
