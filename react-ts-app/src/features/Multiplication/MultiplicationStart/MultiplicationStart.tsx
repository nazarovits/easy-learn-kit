import { useNavigate } from "react-router";
import { RoutePaths } from "../../../routes";
import { Start } from "../../../components/Start";

export interface MultiplicationTableProps {}

export const MultiplicationStart = () => {
  const navigate = useNavigate();
  const onStart = () => navigate(RoutePaths.MultiplicationPlay);

  return <Start title="Szorzótábla" onStart={onStart} />;
};

export default MultiplicationStart;
