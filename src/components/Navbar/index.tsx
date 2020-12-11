import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import {
  LoginOutlined,
  UserOutlined,
  FileAddOutlined,
  LogoutOutlined,
  HomeOutlined,
  DashboardOutlined,
  BookOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const { Header } = Layout;

interface INavbarProps {
  userName?: string;
  roles?: string[];
  image?: string;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

const Navbar: React.SFC<RouteComponentProps<undefined> & INavbarProps> = (
  props
) => {
  const getDefaultSelectedKey = (): string => {
    if (props.history.location.pathname === "/") return "1";
    if (props.history.location.pathname === "/blogs") return "2";

    return "0";
  };

  const handleLogout = () => {
    props.onLogoutClick && props.onLogoutClick();
    props.history.push("/");
  };

  const selectedKey = getDefaultSelectedKey();
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div style={{ display: "flex" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to={"/blogs"}>Blogs</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ReadOutlined />}>Stories</Menu.Item>
          <Menu.Item key="4">Tutorials</Menu.Item>
        </Menu>
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <Menu theme="dark" mode="horizontal" selectable={false}>
            {!props.userName ? (
              <Menu.Item onClick={props.onLoginClick} icon={<LoginOutlined />}>
                Login
              </Menu.Item>
            ) : (
              <SubMenu
                icon={
                  props.image ? (
                    <Avatar style={{ marginRight: "10px" }} src={props.image} />
                  ) : (
                    <UserOutlined />
                  )
                }
                title={props.userName}
              >
                <Menu.ItemGroup>
                  {props.roles?.includes("ADMIN") && (
                    <Menu.Item icon={<DashboardOutlined />} key="sub0">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </Menu.Item>
                  )}
                  {props.roles?.includes("ADMIN") ||
                  props.roles?.includes("BLOGGER") ? (
                    <Menu.Item icon={<FileAddOutlined />} key="sub1">
                      <Link to={"/blogger"}>Blogger</Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item icon={<FileAddOutlined />} key="sub1">
                      <Link to={"/blogger/register"}>Upgrade</Link>
                    </Menu.Item>
                  )}

                  <Menu.Item icon={<UserOutlined />} key="sub2">
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    key="sub3"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            )}
          </Menu>
        </div>
      </div>
    </Header>
  );
};

export default withRouter(Navbar);
