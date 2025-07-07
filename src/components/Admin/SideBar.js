import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardQuestion,
  faGears,
  faNoteSticky,
  faTableColumns,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SideBar = (props) => {
  const { collapsed } = props;
  const { t } = useTranslation();
  return (
    <Sidebar
      collapsed={collapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "#fff",

          position: "fixed",
          top: 68,
          bottom: 0,
          left: 0,
          width: collapsed ? "80px" : "250px",
          zIndex: 1000,
          transition: "all 0.25s linear",
          borderRight: "1px solid rgb(239, 239, 239)",
        },
      }}
    >
      <div className="sidebar-content mt-3">
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
          {/* <MenuItem
            // component={<Link to="/admin" />}
            icon={
             
            }
            
          >
            Collapse
          </MenuItem> */}
          <MenuItem
            component={<Link to="/admin" />}
            icon={
              <FontAwesomeIcon
                icon={faTableColumns}
                style={{ fontSize: "20px" }}
              />
            }
          >
            {t("admin.sidebar.dashboard")}
          </MenuItem>
          <SubMenu
            label={t("admin.sidebar.labelfeatures.features")}
            icon={
              <FontAwesomeIcon icon={faGears} style={{ fontSize: "20px" }} />
            }
          >
            <MenuItem
              icon={<FontAwesomeIcon icon={faUsers} />}
              component={<Link to="manage-users" />}
            >
              &nbsp; {t("admin.sidebar.labelfeatures.manage.user")}
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon icon={faNoteSticky} />}
              component={<Link to="manage-quiz" />}
            >
              &nbsp; {t("admin.sidebar.labelfeatures.manage.quiz")}
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon icon={faClipboardQuestion} />}
              component={<Link to="manage-questions" />}
            >
              &nbsp; {t("admin.sidebar.labelfeatures.manage.ques")}
            </MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div className="sidebar-footer"> </div>
    </Sidebar>
  );
};

export default SideBar;
