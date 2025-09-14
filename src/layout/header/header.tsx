const route: string = "";

import { NavLink } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";

import { RoutePaths } from "../../routes/routes";

export const Header = () => {
  const items = [
    { name: "Összeadás", path: RoutePaths.Addition },
    { name: "Kivonás", path: RoutePaths.Subtraction },
    { name: "Szorzás", path: RoutePaths.MultiplicationTable },
    { name: "Osztás", path: RoutePaths.DivisionTable },
  ];

  return (
    <header className="app-header">
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container>
          <Navbar.Brand className="me-auto">
            <NavLink to={RoutePaths.Home}>Easy Learn Kit</NavLink>
          </Navbar.Brand>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav
              className="me-auto inline-block justify-content-right"
              variant="underline"
            >
              {items.map((item) => (
                <Nav.Item key={item.name}>
                  <Nav.Link key={item.name} href={item.path}>
                    {item.name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {false && (
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
                  end={false}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
