import { useLocation } from "react-router";

import { NavLink } from "react-router";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { RoutePaths } from "../../routes/routes";
import { createHeaderItems, HeaderNavItem, HeaderSubNavItem } from "./config";

export const Header = () => {
  const location = useLocation();
  const headerItems = createHeaderItems();

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
              {headerItems.map((headerItem) => {
                if (headerItem.type === "default") {
                  const navItem = headerItem as HeaderNavItem;
                  return (
                    <Nav.Item key={navItem.name}>
                      <Nav.Link as={NavLink} to={navItem.path}>
                        {navItem.name}
                      </Nav.Link>
                    </Nav.Item>
                  );
                }

                if (headerItem.type === "dropdown") {
                  const subNavItem = headerItem as HeaderSubNavItem;
                  const isActive = !!(
                    headerItem.path &&
                    location.pathname.startsWith(headerItem.path)
                  );

                  return (
                    <NavDropdown
                      title={subNavItem.name}
                      key={subNavItem.name}
                      active={isActive}
                    >
                      {subNavItem.items.map((subItem) => (
                        <NavDropdown.Item
                          as={NavLink}
                          to={subItem.path}
                          key={subItem.name}
                        >
                          {subItem.name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  );
                }

                console.warn(
                  `Unknown header item type ${headerItem.type} for ${headerItem}`
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
