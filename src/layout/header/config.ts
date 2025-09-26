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
  items: HeaderNavItem[] | HeaderSubNavItem[];
}

export type HeaderItem = HeaderNavItem | HeaderSubNavItem;
export type HeaderItems = HeaderItem[];

export const createHeaderItems = (): HeaderItems => {
  const headerItems: HeaderItems = [
    { type: "default", name: "ABC", path: RoutePaths.ABC },
    {
      name: "Matek 2-osztály",
      type: "dropdown",
      path: RoutePaths.Matek1,
      items: [
        {
          name: "Összeadás",
          type: "default",
          path: RoutePaths.Matek1Addition,
        },
        {
          name: "Kivonás",
          type: "default",
          path: RoutePaths.Matek1Substration,
        },
      ],
    },

    {
      type: "dropdown",
      name: "Matek 3-osztály",
      path: RoutePaths.Matek2,
      items: [
        { name: "Összeadás", type: "default", path: RoutePaths.Matek2Addition },
        {
          name: "Kivonás",
          type: "default",
          path: RoutePaths.Matek2Substration,
        },
        {
          name: "Szorzás",
          type: "default",
          path: RoutePaths.Matek2Multiplication,
        },
        { name: "Osztás", type: "default", path: RoutePaths.Matek2Division },
      ],
    },
  ];
  return headerItems;
};
