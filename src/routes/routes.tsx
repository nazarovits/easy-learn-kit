import { createBrowserRouter } from "react-router";

import MultiplicationTable from "../components/MultiplicationTable";
import { MultiplicationStart } from "../features/Multiplication/MultiplicationStart";
import { MultiplicationPlay } from "../features/Multiplication/MultiplicationPlay";
import DivisionTable from "../components/DivisionTable";
import App from "../App";

export enum RoutePaths {
  Home = "",
  MultiplicationTable = "multiplication-table",
  MultiplicationStart = "multiplication/start",
  MultiplicationPlay = "/multiplication/play",
  DivisionTable = "/division-table",
}

export const router = createBrowserRouter([
  {
    path: RoutePaths.Home,
    element: <App />,
    children: [
      {
        index: true,
        element: <>Szia :)</>,
      },
      {
        path: RoutePaths.MultiplicationStart,
        element: <MultiplicationStart />,
      },
      {
        path: RoutePaths.MultiplicationPlay,
        element: <MultiplicationPlay />,
      },
      {
        path: RoutePaths.MultiplicationTable,
        element: <MultiplicationTable />,
      },
      { path: RoutePaths.DivisionTable, element: <DivisionTable /> },
    ],
  },
]);
