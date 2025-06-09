import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClipboardQuestion,
  faGears,
  faNoteSticky,
  faTableColumns,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sidebar
      collapsed={collapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "#fff",
          height: "100vh",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: collapsed ? "80px" : "250px",
          zIndex: 1000,
          transition: "all 0.25s linear",
          borderRight: "1px solid rgb(239, 239, 239)",
        },
      }}
    >
      <div className="sidebar-header d-flex align-items-center">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <div className="d-flex align-items-center">
            <div className="logo-q">Q</div>
            <p className="logo-title"> Quinn_MQ</p>
          </div>
        </NavLink>

        <div onClick={() => setCollapsed(!collapsed)} className="btn-toggle">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>

      <div className="sidebar-content mt-5">
        <Menu
          menuItemStyles={
            {
              //   button: ({ level, active, disabled }) => {
              //     if (level === 0)
              //       return {
              //         color: disabled ? "#f5d9ff" : "#d359ff",
              //         backgroundColor: active ? "#eecef9" : undefined,
              //       };
              //   },
            }
          }
        >
          <MenuItem
            component={<Link to="/admin" />}
            icon={
              <FontAwesomeIcon
                icon={faTableColumns}
                style={{ fontSize: "20px" }}
              />
            }
          >
            Dashboard
          </MenuItem>
          <SubMenu
            label="Features"
            icon={
              <FontAwesomeIcon icon={faGears} style={{ fontSize: "20px" }} />
            }
          >
            <MenuItem
              icon={<FontAwesomeIcon icon={faUsers} />}
              component={<Link to="manage-users" />}
            >
              &nbsp; Manage Users
            </MenuItem>
            <MenuItem icon={<FontAwesomeIcon icon={faNoteSticky} />}>
              &nbsp; Manage Quizs
            </MenuItem>
            <MenuItem icon={<FontAwesomeIcon icon={faClipboardQuestion} />}>
              &nbsp; Manage Questions
            </MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div className="sidebar-footer"> </div>
    </Sidebar>
  );
};

export default SideBar;
