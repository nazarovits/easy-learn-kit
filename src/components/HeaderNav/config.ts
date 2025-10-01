type RoutePaths = string;

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
    { type: "default", name: "ABC", path: "/abc" },
    {
      name: "Matek 2-osztály",
      type: "dropdown",
      path: "/matek/2",
      items: [
        {
          name: "Összeadás",
          type: "default",
          path: "/matek/2/addition",
        },
        {
          name: "Kivonás",
          type: "default",
          path: "/matek/2/substraction",
        },
      ],
    },
    {
      name: "Matek 3-osztály",
      type: "dropdown",
      path: "/matek/3",
      items: [
        {
          name: "Összeadás",
          type: "default",
          path: "/matek/3/addition",
        },
        {
          name: "Kivonás",
          type: "default",
          path: "/matek/3/substraction",
        },
        {
          name: "Szorzás",
          type: "default",
          path: "/matek/3/multiplication",
        },
        {
          name: "Osztás",
          type: "default",
          path: "/matek/3/division",
        },
      ],
    },
  ];
  return headerItems;
};
