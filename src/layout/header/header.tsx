const route: string = "";

import { NavLink } from "react-router";

import { RoutePaths } from "../../routes/routes";

export const Header = () => {
  const items = [
    { name: "Home", path: RoutePaths.Home },
    { name: "Szorzas", path: RoutePaths.MultiplicationStart },
    { name: "Osztas", path: "/division-table" },
  ];

  return (
    <header className="app-header">
      <nav className="navbar navbar-dark bg-dark">
        <ul className="navbar-nav flex-row gap-2">
          {items.map((item) => (
            <li
              key={item.name}
              className={`nav-item ${route === item.path ? "active" : ""}`}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
