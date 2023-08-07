import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Hnavr = () => {
  const state = useSelector((state: any) => state.cart.cart);

  const navigate = useNavigate();
  const [loggedin, setLoggedin] = useState(false);
  function loginto() {
    localStorage.removeItem("token");
    localStorage.removeItem("persist:root");
    navigate("/login");
  }
  function login() {
    navigate("/login");
  }
  function signup() {
    navigate("/signup");
  }
  function routechange() {
    navigate("/cart");
  }

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setLoggedin(true);
    }
  });
  return (
    // data-bs-theme="dark"
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">E-COMMERCE APP</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link id="navbuttons">
            {loggedin ? (
              <Button variant="outline-primary" onClick={loginto}>
                Logout
              </Button>
            ) : (
              <Button variant="outline-primary" onClick={login}>
                Login
              </Button>
              
            )}
            {loggedin ? (
              <></>
            ) : (
              <Button variant="outline-primary" onClick={signup}>
                SignUp
              </Button>
            )
            }
          </Nav.Link>
          {/* <Nav.Link id="navbuttons">
            <Button variant="outline-primary" onClick={signup}>
              SignUp
            </Button>
          </Nav.Link> */}
          <Nav.Link id="navbuttons">
            {loggedin ? (
            
              <Button variant="outline-primary" onClick={routechange}>
               
                Cart item :{state.length}
              </Button>
            ) : (
              <></>
            )}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Hnavr;
