import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Tabs,
  Divider,
  Alert,
  message,
  Result,
} from "antd";
import { IHobbiestDenAppState } from "../../redux/reducers";
import AuthActions from "../../redux/actions/authActions";
import { GetConnectDispatchPropsType } from "../../utils/actionCreators";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  FacebookFilled,
  GoogleSquareFilled,
} from "@ant-design/icons";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import cookies from "react-cookies";
import FacebookLogin, {
  ReactFacebookLoginInfo,
} from "react-facebook-login";

import "./Login.css";
import { ValidateStatus } from "antd/lib/form/FormItem";

const FormItem = Form.Item;
const { TabPane } = Tabs;

interface ILoginProps {
  handleModalClose: () => void;
}
type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof AuthActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = ILoginProps &
  TStateProps &
  TDispatchProps &
  RouteComponentProps<undefined>;

interface ILoginForm {
  email: string;
  password: string;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: () => void;
  validationState?: {
    emailId: { validationStatus: ValidateStatus; help: string };
    password: { validationStatus: ValidateStatus; help: string };
  };
}
const LoginForm: React.FC<ILoginForm> = (props) => {
  return (
    <Form className="login-form">
      <FormItem
        hasFeedback
        validateStatus={
          props.email && props.validationState
            ? props.validationState.emailId.validationStatus
            : undefined
        }
        help={
          props.email && props.validationState
            ? props.validationState.emailId.help
            : undefined
        }
      >
        <Input
          prefix={<MailOutlined />}
          type="email"
          placeholder="Email"
          size="large"
          value={props.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.handleEmailChange(e.target.value);
          }}
        />
      </FormItem>
      <FormItem
        hasFeedback
        validateStatus={
          props.password && props.validationState
            ? props.validationState.password.validationStatus
            : undefined
        }
        help={
          props.password && props.validationState
            ? props.validationState.password.help
            : undefined
        }
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          size="large"
          value={props.password}
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

interface IRegisterProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  handleFormChange: (fields: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
  }) => void;
  onSubmit: () => Promise<void>;
  validationSuccess?: string;
  validationFailed?: string;
  submitSuccess?: string;
  onSubmitSuccesClick?: () => void;
}

const RegisterForm: React.FC<IRegisterProps> = (props) => {
  const handleChannge = (
    field: "email" | "firstName" | "lastName" | "password" | "confirmPassword",
    value: string
  ) => {
    const payload: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      confirmPassword: string;
    } = {
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      password: props.password,
      confirmPassword: props.confirmPassword,
    };
    if (field === "email") {
      payload.email = value;
    } else if (field === "firstName") {
      payload.firstName = value;
    } else if (field === "lastName") {
      payload.lastName = value;
    } else if (field === "password") {
      payload.password = value;
    } else {
      payload.confirmPassword = value;
    }
    props.handleFormChange({ ...payload });
  };
  if (props.submitSuccess) {
    return (
      <Result
        status="success"
        title={props.submitSuccess}
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={props.onSubmitSuccesClick}
          >
            Ok
          </Button>,
          // <Button key="buy">Buy Again</Button>,
        ]}
      />
    );
  }
  return (
    <Form className="register-form">
      <FormItem>
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          size="large"
          value={props.email}
          onChange={(e) => handleChannge("email", e.target.value)}
        />
      </FormItem>
      <FormItem>
        <Input
          prefix={<UserOutlined />}
          placeholder="First Name"
          size="large"
          value={props.firstName}
          onChange={(e) => handleChannge("firstName", e.target.value)}
        />
      </FormItem>
      <FormItem>
        <Input
          prefix={<UserOutlined />}
          placeholder="Last Name"
          size="large"
          value={props.lastName}
          onChange={(e) => handleChannge("lastName", e.target.value)}
        />
      </FormItem>
      <FormItem>
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          size="large"
          value={props.password}
          onChange={(e) => handleChannge("password", e.target.value)}
        />
      </FormItem>
      <FormItem>
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
          size="large"
          value={props.confirmPassword}
          onChange={(e) => handleChannge("confirmPassword", e.target.value)}
        />
      </FormItem>
      {(props.validationSuccess || props.validationFailed) && (
        <FormItem>
          {props.validationSuccess && (
            <Alert message={props.validationSuccess} type="success" />
          )}
          {props.validationFailed && (
            <Alert message={props.validationFailed} type="error" />
          )}
        </FormItem>
      )}
      <FormItem>
        <Button
          type="primary"
          size="large"
          className="login-form-button"
          onClick={props.onSubmit}
        >
          Sign Up
        </Button>
      </FormItem>
    </Form>
  );
};

const LoginRegister: React.FC<TAllProps> = (props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [activetab, setActiveTab] = useState("1");
  const [loginValidation, setLoginValidation] = useState<{
    emailId: { validationStatus: ValidateStatus; help: string };
    password: { validationStatus: ValidateStatus; help: string };
  }>({
    emailId: { validationStatus: "", help: "" },
    password: { validationStatus: "", help: "" },
  });

  useEffect(() => {
    const emailRegex = /(\w+|\d+)\u0040(\w+|\d+)\.(\w{3})|(\w+|\d+)\u0040(\w+|\d+)\.(\w{2})\.(\w{2})/g;

    if (email && emailRegex.test(email)) {
      console.log(email);
      setLoginValidation((prev) => ({
        ...prev,
        emailId: { ...prev.emailId, validationStatus: "success", help: "" },
      }));
    } else {
      setLoginValidation((prev) => ({
        ...prev,
        emailId: { validationStatus: "error", help: "This not a valid email" },
      }));
    }
  }, [email]);

  useEffect(() => {
    if (password && password.length >= 8 && password.length <= 12) {
      setLoginValidation((prev) => ({
        ...prev,
        password: { validationStatus: "success", help: "" },
      }));
    } else {
      setLoginValidation((prev) => ({
        ...prev,
        password: {
          validationStatus: "error",
          help: "Password should be at least 8-12 characters",
        },
      }));
    }
  }, [password]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const handleLogin = async () => {
    const payload = { email, password };
    try {
      const result = await props.login(payload);
      cookies.save("Authorization", result.payload.res.token, {});
      await props.fetchUser({});
      resetForm();
      props.handleModalClose();
      message.success("Now you are logged in");
    } catch (error) {
      message.error(error.payload.res.response.message);
    }
  };

  const handleRegisterFormChange = (fields: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
  }) => {
    setEmail(fields.email);
    setFirstName(fields.firstName);
    setLastName(fields.lastName);
    setPassword(fields.password);
    setConfirmPassword(fields.confirmPassword);
  };

  const handleRegisterSubmit = async () => {
    try {
      await props.createUser({ email, firstName, lastName, password });
      resetForm();
      setSubmitSuccess("Now you are a part of Hobbiestden family...");
    } catch (error) {
      throw error;
    }
  };

  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setConfirmPassword("");
    setSubmitSuccess("");
  };

  const handleFacebookLogin = async (
    response: ReactFacebookLoginInfo
  ) => {
  
    const payload = { email: response.email || '', firstName: response.name ? response.name.split(" ")[0] : '' , lastName: response.name ? response.name.split(" ")[1] : '', image: response.picture?.data.url || '' };
    try {
      const result = await props.facebookLogin(payload);
      cookies.save("Authorization", result.payload.res.token, {});
      await props.fetchUser({});
      resetForm();
      props.handleModalClose();
      message.success("Now you are logged in");
    } catch (error) {
      message.error(error.payload.res.response.message);
    }
  };

  return (
    <div>
      <Tabs activeKey={activetab} onChange={handleTabChange}>
        <TabPane tab="Login" key="1" style={{ padding: "5px" }}>
          <LoginForm
            email={email}
            password={password}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleLogin}
            validationState={loginValidation}
          />
        </TabPane>
        <TabPane tab="Register" key="2" style={{ padding: "5px" }}>
          <RegisterForm
            email={email}
            password={password}
            firstName={firstName}
            lastName={lastName}
            confirmPassword={confirmPassword}
            handleFormChange={handleRegisterFormChange}
            onSubmit={handleRegisterSubmit}
            submitSuccess={submitSuccess}
            onSubmitSuccesClick={() => setActiveTab("1")}
          />
        </TabPane>
      </Tabs>
      {!submitSuccess && <Divider orientation="center">OR</Divider>}
      <div
        style={{
          display: !submitSuccess ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "5px" }}>
            <FacebookLogin
              appId="2611301945796048"
              fields="name,email,picture"
              callback={handleFacebookLogin}
              
              cssClass="ant-btn ant-btn-primary"
              icon={<FacebookFilled style={{ marginRight: "5px" }} />}
            />
          </div>
          <div style={{ marginLeft: "5px" }}>
            <Button icon={<GoogleSquareFilled />} type="primary" danger>
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
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
