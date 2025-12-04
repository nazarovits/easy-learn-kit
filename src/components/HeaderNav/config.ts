type RoutePaths = string;

export type HeaderNavType = "default" | "dropdown";
export interface HeaderNavItem {
  type?: HeaderNavType;
  name: string;
  path: RoutePaths;
}

export interface HeaderSubNavItem {
  type?: HeaderNavType;
  name: string;
  path: RoutePaths;
  items: HeaderNavItem[] | HeaderSubNavItem[];
}

export type HeaderItem = HeaderNavItem | HeaderSubNavItem;
export type HeaderItems = HeaderItem[];

export const createHeaderItems = (): HeaderItems => {
  const headerItems: HeaderItems = [
    { name: "ABC", path: "/abc" },
    {
      name: "Matek 2-osztály",
      type: "dropdown",
      path: "/matek/2",
      items: [
        {
          name: "Összeadás",
          path: "/matek/2/addition",
        },
        {
          name: "Kétjegyű számok összeadása tízesátlépéssel",
          path: "/matek/2/addition-carry",
        },
        {
          name: "Kivonás",
          path: "/matek/2/substraction",
        },
        {
          name: "Kétjegyű számok kivonása tízesátlépéssel",
          path: "/matek/2/substraction-carry",
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
          path: "/matek/3/addition",
        },
        {
          name: "Kivonás",
          path: "/matek/3/substraction",
        },
        {
          name: "Szorzás",
          path: "/matek/3/multiplication",
        },
        {
          name: "Szorzás (időre)",
          path: "/matek/3/multiplication-timer",
        },
        {
          name: "Osztás",
          path: "/matek/3/division",
        },
        {
          name: "Maradékos osztás",
          path: "/matek/3/mod",
        },
        {
          name: "Relációk",
          path: "/matek/3/compare/100-999",
        },
      ],
    },
  ];
  return headerItems;
};
