import SideBar from "./SideBar";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import { NavDropdown, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";
import { postLogOut } from "../../services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import Profile from "../Header/Profile";
const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showProfile, setShowProfile] = useState(false);

  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
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
    <div className="admin-container">
      <div
        className="admin-header d-flex justify-content-between"
        style={{ height: "auto", width: "100%" }}
      >
        <div className="sidebar-header d-flex align-items-center">
          <span className="sidebar-toggle">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => setCollapsed(!collapsed)}
            />
          </span>
          <NavLink style={{ textDecoration: "none", overflow: "hidden" }}>
            <div
              className="d-flex align-items-center"
              onClick={() => navigate("/")}
            >
              <div className="logo-q">Q</div>
              <p className="logo-title"> Quinn_MQ</p>
            </div>
          </NavLink>

          {/* <div onClick={() => setCollapsed(!collapsed)} className="btn-toggle">
                  <FontAwesomeIcon icon={faBars} />
                </div> */}
        </div>

        <div className="setting">
          <Language />
          <NavDropdown
            title={t("admin.header.setting")}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => setShowProfile(true)}>
              {t("admin.header.profile")}
            </NavDropdown.Item>
            <Profile
              showProfile={showProfile}
              setShowProfile={setShowProfile}
            />
            <NavDropdown.Item onClick={() => handleLogOut()}>
              {t("admin.header.logout")}
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
      <div className="admin-content" style={{ height: "auto", width: "100%" }}>
        <div className="admin-sidebar">
          <SideBar collapsed={collapsed} />
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
