"use client";

import { usePathname } from "next/navigation";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { createHeaderItems, HeaderNavItem, HeaderSubNavItem } from "./config";

export const Header = () => {
  const pathname = usePathname();
  const headerItems = createHeaderItems();

  return (
    <header className="app-header">
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container>
          <Navbar.Brand className="me-auto" href="/">
            Easy Learn Kit
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav
              className="me-auto inline-block justify-content-right"
              variant="underline"
            >
              {headerItems.map((headerItem) => {
                const type = headerItem.type || "default";
                if (type === "default") {
                  const navItem = headerItem as HeaderNavItem;
                  return (
                    <Nav.Item key={navItem.name}>
                      <Nav.Link href={navItem.path}>{navItem.name}</Nav.Link>
                    </Nav.Item>
                  );
                }

                if (type === "dropdown") {
                  const subNavItem = headerItem as HeaderSubNavItem;
                  const isActive = !!(
                    headerItem.path && pathname.startsWith(headerItem.path)
                  );

                  return (
                    <NavDropdown
                      title={subNavItem.name}
                      key={subNavItem.name}
                      active={isActive}
                    >
                      {subNavItem.items.map((subItem) => (
                        <NavDropdown.Item
                          key={subItem.name}
                          href={subItem.path}
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
