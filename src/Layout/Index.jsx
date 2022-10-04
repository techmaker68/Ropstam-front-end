import Logo from "Assets/logo.svg";
import { ReactComponent as DashboardIcon } from "Assets/icons/dashboard.svg";
import { ReactComponent as PaymentsIcon } from "Assets/icons/payments.svg";
import { ReactComponent as TenantsIcon } from "Assets/icons/tenants.svg";
import { ReactComponent as RequestsIcon } from "Assets/icons/requests.svg";
import { ReactComponent as ManagementIcon } from "Assets/icons/management.svg";
import { ReactComponent as SettingsIcon } from "Assets/icons/setting.svg";
import ProfileIcon from "Assets/icons/profile.svg";
import DownIcon from "Assets/icons/downIcon.svg";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";

// Use as parent wrapper. Render Sidebar, Top nav and Content of the page
const Index = ({ children, title, currentPage }) => {
  const { login: signin, getUser } = useUserContext();
  const { logout } = useUserContext();

  // profile menu

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={() => logout()}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  // static nav links data
  const navLinks = [
    { title: "Registered cars", url: "/cars", icon: <TenantsIcon /> },
    { title: "Brands", url: "/Brands", icon: <DashboardIcon /> },
    { title: "categories", url: "/categories", icon: <PaymentsIcon /> },
    { title: "Products", url: "/products", icon: <TenantsIcon /> },

  ];

  return (
    <div className="layout-wrapper">
      <nav className="side-nav">
        {
          // logo
        }
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        {
          // nav links
        }
        <ul>
          {navLinks.map((link, index) => {
            return (
              <li
                key={link.title}
                className={currentPage === index ? "li-active" : ""}
              >
                <Link to={link.url}>
                  {link.icon} {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex-1">
        {
          // top nav
        }
        <nav className="top-nav">
          <div className="f-16 fw-600">{title}</div>
          <Dropdown
            placement="bottomLeft"
            className="cursor-pointer"
            overlay={menu}
            trigger={["click"]}
          >
            <div className="dropdown-trigger">
              <img src={ProfileIcon} alt="" />
              <span className="fw-500 f-12 color-primary username">
                Muzamil Afridi
              </span>
              <img className="down-icon" src={DownIcon} alt="" />
            </div>
          </Dropdown>
        </nav>
        {
          // main content
        }
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Index;
