import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { postLogOut } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";
import { useState } from "react";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // console.log("🚀 ~ HomePage ~ isAuthenticated:", isAuthenticated);
  const account = useSelector((state) => state.user.account);
  // const roleUSer = useSelector((state) => state.user.account.role);
  // console.log("🚀 ~ HomePage ~ account:", account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showProfile, setShowProfile] = useState(false);
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogOut = async () => {
    let res = await postLogOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      //clear data redux
      dispatch(doLogout());
      navigate("/login");
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
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
                {t("header.home")}
              </NavLink>
              <NavLink to="/users" className="nav-link">
                {t("header.users")}
              </NavLink>
              <NavLink to="/admin" className="nav-link">
                {t("header.admin")}
              </NavLink>
            </Nav>
            <Language />
            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button
                    className="btn-login ms-3 "
                    onClick={() => handleLogin()}
                  >
                    {t("header.login")}
                  </button>
                  <button
                    className="btn-signup "
                    onClick={() => {
                      navigate("/sign_up");
                    }}
                  >
                    {t("header.signup")}
                  </button>
                </>
              ) : (
                <NavDropdown
                  title={t("header.setting")}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => setShowProfile(true)}>
                    {t("header.profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    {t("header.logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
    </>
  );
};

export default Header;
