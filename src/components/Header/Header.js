import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // console.log("🚀 ~ HomePage ~ isAuthenticated:", isAuthenticated);
  const account = useSelector((state) => state.user.account);
  // console.log("🚀 ~ HomePage ~ account:", account);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary pt-3 ">
      <Container>
        <NavLink
          to="/"
          className="navbar-brand"
          style={{ textDecoration: "none", overflow: "hidden" }}
        >
          <div
            className="d-flex align-items-center"
            onClick={() => navigate("/")}
          >
            <div className="logo-q">Q</div>
            <p className="logo-title"> Quinn_MQ</p>
          </div>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home{" "}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users{" "}
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              Admin{" "}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-login " onClick={() => handleLogin()}>
                  Log in
                </button>
                <button
                  className="btn-signup "
                  onClick={() => {
                    navigate("/sign_up");
                  }}
                >
                  Sign in
                </button>
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Log out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
