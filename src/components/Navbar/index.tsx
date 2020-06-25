import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { LoginOutlined, UserOutlined, FileAddOutlined, LogoutOutlined, SettingOutlined, HomeOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const { Header } = Layout;

interface INavbarProps {
  userName?: string;
  roles?: string[];
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

const Navbar: React.SFC<RouteComponentProps<undefined> & INavbarProps> = (
  props
) => {
  const getDefaultSelectedKey = (): string => {
    if (props.history.location.pathname === "/home") return "1";
    if (props.history.location.pathname === "/hello2") return "2";

    return "0";
  };

  const handleLogout = () => {
    props.onLogoutClick && props.onLogoutClick();
    props.history.push('/home');
  }

  const selectedKey = getDefaultSelectedKey();
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div style={{ display: "flex" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to={"/home"}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={"/hello2"}>Nav2</Link>
          </Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="4">nav 3</Menu.Item>
        </Menu>
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <Menu theme="dark" mode="horizontal" selectable={false}>
            {!props.userName ? (
              <Menu.Item onClick={props.onLoginClick} icon={<LoginOutlined />}>
                Login
              </Menu.Item>
            ) : (
              <SubMenu icon={<UserOutlined />} title={props.userName}>
                <Menu.ItemGroup>
                  {props.roles?.includes("ADMIN") && (
                    <Menu.Item icon={<FileAddOutlined />} key="sub1"> <Link to={"/blogger"}>Blogger</Link></Menu.Item>
                  )}

                  <Menu.Item icon={<SettingOutlined />} key="sub2">Settings</Menu.Item>
                  <Menu.Item key="sub3" icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Menu.Item>
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
