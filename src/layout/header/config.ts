import { RoutePaths } from "../../routes";

export type HeaderNavType = "default" | "dropdown";
export interface HeaderNavItem {
  type: HeaderNavType;
  name: string;
  path: RoutePaths;
}

export interface HeaderSubNavItem {
  type: HeaderNavType;
  name: string;
  path: RoutePaths;
  items: HeaderNavItem[];
}

export type HeaderItem = HeaderNavItem | HeaderSubNavItem;
export type HeaderItems = HeaderItem[];

export const createHeaderItems = (): HeaderItems => {
  const headerItems: HeaderItems = [
    { type: "default", name: "ABC", path: RoutePaths.ABC },
    {
      type: "dropdown",
      name: "Matek",
      path: RoutePaths.Matek,
      items: [
        { name: "Összeadás", type: "default", path: RoutePaths.Addition },
        { name: "Kivonás", type: "default", path: RoutePaths.Subtraction },
        {
          name: "Szorzás",
          type: "default",
          path: RoutePaths.Multiplication,
        },
        { name: "Osztás", type: "default", path: RoutePaths.Division },
      ],
    },
  ];
  return headerItems;
};
