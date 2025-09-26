import { createBrowserRouter } from "react-router";

import { HomePage } from "../features/Home";
import MultiplicationTable from "../components/MultiplicationTable";
import Addition from "../components/Addition";
import Substraction from "../components/Substraction";
import DivisionTable from "../components/DivisionTable";
import App from "../App";
import ABC from "../features/ABC";

import { Addition1, Substraction1 } from "../features/Matek1";

export enum RoutePaths {
  Home = "",
  ABC = "/abc",
  Matek = "/matek",
  Matek1 = "/matek/1",
  Matek1Addition = "/matek/1/addition",
  Matek1Substration = "/matek/1/subtraction",

  Matek2 = "/matek/2",
  Matek2Addition = "/matek/2/addition",
  Matek2Substration = "/matek/2/subtraction",
  Matek2Multiplication = "/matek/2/multiplication",
  Matek2Division = "/matek/2/division",

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
        path: RoutePaths.Matek1,
        children: [
          {
            path: RoutePaths.Matek1Addition,
            element: <Addition1 />,
          },
          {
            path: RoutePaths.Matek1Substration,
            element: <Substraction1 />,
          },
        ],
      },
      {
        path: RoutePaths.Matek2,
        children: [
          {
            path: RoutePaths.Matek2Addition,
            element: <Addition />,
          },
          {
            path: RoutePaths.Matek2Substration,
            element: <Substraction />,
          },
          {
            path: RoutePaths.Matek2Multiplication,
            element: <MultiplicationTable />,
          },
          {
            path: RoutePaths.Matek2Division,
            element: <DivisionTable />,
          },
        ],
      },
      /*
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
      */
    ],
  },
]);
