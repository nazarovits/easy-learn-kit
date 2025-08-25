import { createBrowserRouter } from "react-router";

import { HomePage } from "../features/Home";
import MultiplicationTable from "../components/MultiplicationTable";
import { MultiplicationStart } from "../features/Multiplication/MultiplicationStart";
import { MultiplicationPlay } from "../features/Multiplication/MultiplicationPlay";
import Addition from "../components/Addition";
import DivisionTable from "../components/DivisionTable";
import App from "../App";

export enum RoutePaths {
  Home = "",
  Addition = "/addition",
  MultiplicationTable = "multiplication-table",
  MultiplicationStart = "/multiplication/start",
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
        element: <HomePage />,
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
      { path: RoutePaths.Addition, element: <Addition /> },
    ],
  },
]);
