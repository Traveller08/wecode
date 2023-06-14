import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate, Link } from 'react-router-dom';
import Cookies from "js-cookie";
import './Navbar.css';
const NavBar = (props) => {
  const navigate = useNavigate();
  const handleLoginButtonClick = (e) =>{
    props.setusertype(e.target.name);
    navigate('/login')
  }
  const handleLogout = (e) => {
    // e.preventDefault();
    if (Cookies.get("token")) {
        Cookies.remove("token");
    }
    if (Cookies.get("user")) {
        Cookies.remove("user");
    }
    alert("Logout successfull");
    navigate('/');
    // navigate('/');
};
  const handleContent =(e) =>{
    e.preventDefault();
    props.setmaincontent(e.target.name);
  }
  return (
    <>
      <Navbar key="lg" bg="light" expand="lg" className="mb-3">
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
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown
                  title="Learn"
                  align={{lg:"end"}}
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavDropdown.Item name="blogs" onClick={handleContent}>Blogs</NavDropdown.Item>
                  <NavDropdown.Item name="tutorials" onClick={handleContent}>Tutorials</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Practice"
                  id={`offcanvasNavbarDropdown-expand-lg`}
                  align={{lg:"end"}}
                >
                  <NavDropdown.Item name="problems" onClick={handleContent}>Problems</NavDropdown.Item>
                  <NavDropdown.Item name="contests" onClick={handleContent}>Contests</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item name="problemSheets" onClick={handleContent}>
                    Problem sheets
                  </NavDropdown.Item>
                  <NavDropdown.Item name="companyWiseProblems" onClick={handleContent}>
                    Company-wise Problems
                  </NavDropdown.Item>
                </NavDropdown>
                {props.user && <Nav.Link name="visualizer" onClick={handleContent}>Visualizer</Nav.Link>}
                {props.user && (
                  <Nav.Link name="discuss" onClick={handleContent}>Discuss</Nav.Link>
                )}
                {
                  props.user && props.usertype==="Educator" &&  <Nav.Link href="#action2">Add resources</Nav.Link>
                }
               
                {props.user && (
                  <NavDropdown
                    title={
                      // <Nav.Link className="">
                      <img
                        src={props.url}
                        className="rounded-circle"
                        alt="Avatar"
                        style={{ height: "30px" }}
                      />
                    // </Nav.Link>
                    }
                    id={`offcanvasNavbarDropdown-expand-lg`}
                    align={{lg:"end"}}

                  >
                    <NavDropdown.Item name="account" onClick={handleContent}>Account</NavDropdown.Item>
                    <NavDropdown.Item name="profile" onClick={handleContent}>
                      Edit profile
                    </NavDropdown.Item>
                    <NavDropdown.Item name="reportBug" onClick={handleContent} >
                      Report a bug
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                    <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
               
              </Nav>
              {!props.user && (
                <div className="d-flex">
                  <Button variant="outline-success"  name="Educator" onClick={handleLoginButtonClick}>Educator</Button>
                  <Button variant="outline-success" name="Learner" onClick={handleLoginButtonClick}>Learner</Button>
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
