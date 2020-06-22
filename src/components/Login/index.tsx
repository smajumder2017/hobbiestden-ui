import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Input, Button, Checkbox, Tabs } from "antd";
import { IHobbiestDenAppState } from "../../redux/reducers";
import AuthActions from "../../redux/actions/authActions";
import { GetConnectDispatchPropsType } from "../../utils/actionCreators";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import cookies from 'react-cookies';

import "./Login.css";

const FormItem = Form.Item;
const { TabPane } = Tabs;

interface ILoginProps {
  handleModalClose: () => void
}
type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof AuthActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = ILoginProps & TStateProps & TDispatchProps & RouteComponentProps<undefined>;

interface ILoginForm {
  email: string;
  password: string;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: () => void;
}
const LoginForm: React.FC<ILoginForm> = (props) => {
  return (
    <Form className="login-form">
      <FormItem>
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          size="large"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.handleEmailChange(e.target.value);
          }}
        />
      </FormItem>
      <FormItem>
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          size="large"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.handlePasswordChange(e.target.value);
          }}
        />
      </FormItem>
      <FormItem>
        <Checkbox>Remember me</Checkbox>
        <a className="login-form-forgot" href="as">
          Forgot password
        </a>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="login-form-button"
          onClick={props.handleSubmit}
        >
          Login
        </Button>
      </FormItem>
    </Form>
  );
};

const RegisterForm = () => {
  return (
    <Form className="login-form">
      <FormItem>
        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
      </FormItem>
      <FormItem>
        <Input
          prefix={<UserOutlined />}
          placeholder="First Name"
          size="large"
        />
      </FormItem>
      <FormItem>
        <Input prefix={<UserOutlined />} placeholder="Last Name" size="large" />
      </FormItem>
      <FormItem>
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </FormItem>
      <FormItem>
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
          size="large"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" size="large" className="login-form-button">
          Sign Up
        </Button>
      </FormItem>
    </Form>
  );
};

const LoginRegister: React.FC<TAllProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const handleLogin = async () => {
    const payload = {email, password};
    try {
      const result = await props.login(payload);
      cookies.save('Authorization', result.payload.res.token, {});
      await props.fetchUser({});
      props.handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Login" key="1" style={{ padding: "5px" }}>
        <LoginForm
          email={email}
          password={password}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin}
        />
      </TabPane>
      <TabPane tab="Register" key="2" style={{ padding: "5px" }}>
        <RegisterForm />
      </TabPane>
    </Tabs>
  );
};

const mapStateToProps = (state: IHobbiestDenAppState) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreators, TDispatchProps>(
    AuthActions,
    dispatch
  );

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginRegister));
