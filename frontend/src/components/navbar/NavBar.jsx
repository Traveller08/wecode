import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const successNotify=(message) =>toast.success(message);
const errorNotify = (message) => toast.error(message);

const NavBar = (props) => {
  
  const navigate = useNavigate();

  const handleLoginButtonClick = (e) =>{
    navigate('/login')
  }

  // const handleLogout = (e) => {
  //   e.preventDefault();

  //   if (Cookies.get("token")) {
  //       Cookies.remove("token");
  //   }
  //   if (Cookies.get("user")) {
  //       Cookies.remove("user");
  //   }
  //   successNotify("Logout successfull!");
    
  //   navigate('/');
  // };
  
  const handleLogout = (e) => {
    e.preventDefault();
    try{

      if (Cookies.get("token")) {
          Cookies.remove("token");
      }
      if (Cookies.get("user")) {
          Cookies.remove("user");
      }
      
      props.setuser(false);

      successNotify("Logout successfull!");

      navigate('/');
      // window.location.href = "/";
    }catch(error){
      console.log("logout error" ,error);
      errorNotify("log out failed");
    }
    
  };

  return (
    <>
      <Navbar key="lg"  expand="lg" className="mb-3 nav" style={{padding:"15px 30px"}}>
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
                  <NavDropdown.Item name="blogs" href="/learn/blogs">Blogs</NavDropdown.Item>
                  <NavDropdown.Item name="tutorials" href="learn/tutorials">Tutorials</NavDropdown.Item>
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
                  <NavDropdown.Item name="problems" href="/practice/problems">Problems</NavDropdown.Item>
                 {props.user && <NavDropdown.Item name="problems" href="/practice/problems/unsolved">Unsolved Problems</NavDropdown.Item>}
                  <NavDropdown.Item name="contests" href="/practice/contests">Contests</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item name="problemSheets" href="/practice/problemsheets">
                    Problem sheets
                  </NavDropdown.Item>
                  <NavDropdown.Item name="companyWiseProblems" href="/practice/companywise/problems">
                    Company-wise Problems
                  </NavDropdown.Item>
                </NavDropdown>
                {props.user && <Nav.Link name="visualizer" href="/visualizer">Visualizer</Nav.Link>}
                {props.user && (
                  <Nav.Link name="discuss" href="/discuss">Discuss</Nav.Link>
                )}

               
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
                    <NavDropdown.Item name="account" href="/profile">My Profile</NavDropdown.Item>
                    <NavDropdown.Item name="profile" href="/edit/profile">
                      Edit profile
                    </NavDropdown.Item>
                    <NavDropdown.Item name="reportBug" href="/report/bug" >
                      Report a bug
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                    <Button variant="outline-success" onClick={handleLogout}>
                      Logout
                      </Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
               
              </Nav>
              {!props.user && (
                <div className="d-flex">
                  <Button variant="outline-primary"  name="user" onClick={handleLoginButtonClick}>Login</Button>
                  
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
