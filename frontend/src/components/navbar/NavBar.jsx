import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./Navbar.css";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

const NavBar = (props) => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const profileUrl = props.url
    ? props.url
    // : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
    : require("../../images/user.png");

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      successNotify("Logout successfull!");
      // Call the logout function from App component to update the user state
      if (Cookies.get("token")) {
        Cookies.remove("token");
      }
      if (Cookies.get("user")) {
        Cookies.remove("user");
      }
      props.logout();
      window.location.href = "/";

      // Redirect to home page
    } catch (error) {
      console.log("logout error", error);
      errorNotify("log out failed");
    }
  };

  return (
    <>
      <Navbar
        key="lg"
        expand="lg"
        className="mb-3 nav"
        style={{ padding: "15px 30px" }}
      >
        <Container fluid>
          <Navbar.Brand href="#">wecode</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                wecode
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown
                  title="Learn"
                  align={{ lg: "end" }}
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavDropdown.Item name="blogs" href="/learn/blogs">
                    Blogs
                  </NavDropdown.Item>
                  <NavDropdown.Item name="tutorials" href="/learn/tutorials">
                    Tutorials
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item> */}
                </NavDropdown>

                <NavDropdown
                  title="Practice"
                  id={`offcanvasNavbarDropdown-expand-lg`}
                  align={{ lg: "end" }}
                >
                  <NavDropdown.Item name="problems" href="/practice/problems">
                    Problems
                  </NavDropdown.Item>
                  {props.user && (
                    <NavDropdown.Item
                      name="problems"
                      href="/practice/problems/unsolved"
                    >
                      Unsolved Problems
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item name="contests" href="/practice/contests">
                    Contests
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    name="problemSheets"
                    href="/practice/problemsheets"
                  >
                    Problem sheets
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item
                    name="companyWiseProblems"
                    href="/practice/companywise/problems"
                  >
                    Company-wise Problems
                  </NavDropdown.Item> */}
                </NavDropdown>
                {props.user && (
                  <Nav.Link name="visualizer" href="/visualizer">
                    Visualizer
                  </Nav.Link>
                )}

                {props.user && (
                  <NavDropdown
                    title={
                      <img
                        src={profileUrl}
                        className="rounded-circle"
                        alt="Avatar"
                        style={{ height: "30px" }}
                      />
                    }
                    id={`offcanvasNavbarDropdown-expand-lg`}
                    align={{ lg: "end" }}
                  >
                    <NavDropdown.Item name="account" href="/profile">
                      My Profile
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Button variant="outline-success" onClick={handleLogout}>
                        Logout
                      </Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
              {!props.user && (
                <div className="d-flex">
                  <Button
                    variant="outline-primary"
                    name="user"
                    onClick={handleLoginButtonClick}
                  >
                    Login
                  </Button>
                </div>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
