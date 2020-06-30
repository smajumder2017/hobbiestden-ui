/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Layout, Modal, Result, Button } from "antd";
import AuthActions from "../redux/actions/authActions";
import { GetConnectDispatchPropsType } from "../utils/actionCreators";
import { IHobbiestDenAppState } from "../redux/reducers";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import cookies from "react-cookies";
import Navbar from "../components/Navbar";
import HomeContainer from "../containers/HomeContainer";
import Login from "../components/Login";
import CreateBlogContainer from "../containers/CreateBlogContainer";
import BloggerContainer from "../containers/BloggerContainer";
import BlogComponent from './BlogContainer';
import Footer from "../components/Footer";

import "antd/dist/antd.css";
import "./App.css";

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof AuthActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = TStateProps & TDispatchProps;

export const App: React.FC<TAllProps> = (props) => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const handleOnLoginClick = () => setLoginModal((prev) => !prev);

  useEffect(() => {
    (async () => {
      try {
        await props.fetchUser({});
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const userName = props.auth.authenticated
    ? props.auth.data?.firstName + " " + props.auth.data?.lastName
    : "";
  const handleLogout = () => {
    cookies.remove("Authorization");
    props.logout();
  };
  return (
    <Router>
      <Layout>
        <Navbar
          userName={userName}
          roles={props.auth.data?.roles}
          onLoginClick={handleOnLoginClick}
          onLogoutClick={handleLogout}
          image={props.auth.data?.image}
        />
        <Layout.Content style={{ marginTop: 64 }}>
          <Switch>
            <Route exact path="/" render={(routerProps) => <HomeContainer {...routerProps} />} />
            <Route path="/hello2" render={(routerProps) => <div>Hello2</div>} />
            {props.auth.authenticated && (
              <Route
                path="/blogger/create/:blogid"
                render={(routerProps) => (
                  <CreateBlogContainer {...routerProps} />
                )}
              />
            )}
            {props.auth.authenticated && (
              <Route
                path="/blogger"
                render={(routerProps) => <BloggerContainer {...routerProps} />}
              />
            )}
              <Route
                path="/blog"
                render={(routerProps) => (
                  <BlogComponent {...routerProps} />
                )}
              />
            <Route
              render={() => (
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={<Button type="primary">Back Home</Button>}
                />
              )}
            />
            {/* <Route path="/blogger/create/:blogid" render={(routerProps) => <CreateBlogContainer {...routerProps} />} /> */}
          </Switch>
        </Layout.Content>
        <Footer />
      </Layout>
      <Modal
        visible={loginModal}
        onCancel={handleOnLoginClick}
        closeIcon={<></>}
        footer={false}
      >
        <Login handleModalClose={handleOnLoginClick} />
      </Modal>
    </Router>
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
)(App);
