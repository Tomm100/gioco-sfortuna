import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LogoutButton } from './AuthComponents';

function NavHeader(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky='top'>
      <Container fluid>
        {/* Brand come Link React */}
        <Navbar.Brand as={Link} to="/">
          Stuff happens
        </Navbar.Brand>

        <Nav className="me-auto">
          {/* Link regole */}
          <Nav.Link as={NavLink} to="/regole">
            Regole
          </Nav.Link>

          {/* Login o Logout */}
          {props.loggedIn ? (
            <LogoutButton logout={props.handleLogout} />
          ) : (
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavHeader;