import React from "react";
import { useNavigate, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavItem } from "react-bootstrap";

function AppNavBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link
            to="/"
            className="text-white"
            style={{ textDecoration: "none" }}
          >
            Book's World
          </Link>
        </Navbar.Brand>

        <Nav className="me-auto">
          <NavItem className="mx-2">
            <Link
              to="/"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Books
            </Link>
          </NavItem>
          <NavItem className="mx-2">
            <Link
              to="/cart"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Cart
            </Link>
          </NavItem>
          <NavItem className="mx-2">
            <Link
              to="/order"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Orders
            </Link>
          </NavItem>
        </Nav>
        <div className="flex justify-content-end">
          {localStorage.token ? (
            <button className="btn btn-primary" onClick={handleClick}>
              Logout
            </button>
          ) : (
            <Nav className="btn btn-primary p-2">
              <Link
                to="/signin"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Signin
              </Link>
            </Nav>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default AppNavBar;
