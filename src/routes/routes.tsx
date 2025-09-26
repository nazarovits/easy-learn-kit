import { createBrowserRouter } from "react-router";

import { HomePage } from "../features/Home";
import MultiplicationTable from "../components/MultiplicationTable";
import Addition from "../components/Addition";
import Substraction from "../components/Substraction";
import DivisionTable from "../components/DivisionTable";
import App from "../App";
import ABC from "../features/ABC";

export enum RoutePaths {
  Home = "",
  ABC = "/abc",
  Matek = "/matek",
  Addition = "/matek/addition",
  Subtraction = "/matek/subtraction",
  Multiplication = "/matek/multiplication",
  Division = "/matek/division",

  MultiplicationTable = "/multiplication-table",
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
        path: RoutePaths.ABC,
        element: <ABC />,
      },
      {
        path: RoutePaths.Matek,
        children: [
          {
            path: RoutePaths.Addition,
            element: <Addition />,
          },
          {
            path: RoutePaths.Subtraction,
            element: <Substraction />,
          },
          {
            path: RoutePaths.Multiplication,
            element: <MultiplicationTable />,
          },
          { path: RoutePaths.Division, element: <DivisionTable /> },
        ],
      },
      {
        path: RoutePaths.MultiplicationTable,
        element: <MultiplicationTable />,
      },
      { path: RoutePaths.DivisionTable, element: <DivisionTable /> },
      { path: RoutePaths.Addition, element: <Addition /> },
      { path: RoutePaths.Subtraction, element: <Substraction /> },
    ],
  },
]);
