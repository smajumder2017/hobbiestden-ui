/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import { IHobbiestDenAppState } from "../../../redux/reducers";
import CreateBlogActions from "../../../redux/actions/createBlogActions";
import { GetConnectDispatchPropsType } from "../../../utils/actionCreators";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Sections } from "../../../components/Sections";
import { BloggerInfo } from "../../../components/BloggerInfo/BloggerInfo";

import "./PreviewComponent.css";
import { Row, Col } from "antd";

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof CreateBlogActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = TStateProps & TDispatchProps;

export const PreviewComponent: React.FC<TAllProps> = (props) => {
  const scrollEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollEnd.current &&
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [props.createBlog.data?.sections.length]);

  const userName =
    props.auth.data?.firstName && props.auth.data?.lastName
      ? props.auth.data?.firstName + " " + props.auth.data?.lastName
      : "";
  return (
    <div className="preview-container">
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          {props.createBlog.data?.coverImageUrl && (
            <>
              <div>
                <img
                  src={props.createBlog.data?.coverImageUrl}
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <BloggerInfo userName={userName} blogDate="10th June, 2020" />
            </>
          )}

          <div className="title">{props.createBlog.data?.title}</div>
          <div className="subtitle">{props.createBlog.data?.subTitle}</div>
          {!props.createBlog.data?.coverImageUrl && (
            <BloggerInfo userName={userName} blogDate="10th June, 2020" />
          )}
          {props.createBlog.data?.sections && (
            <Sections sections={props.createBlog.data?.sections} />
          )}
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{ float: "left", clear: "both" }} ref={scrollEnd}></div>
    </div>
  );
};

const mapStateToProps = (state: IHobbiestDenAppState) => {
  return {
    auth: state.auth,
    createBlog: state.createBlog,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreators, TDispatchProps>(
    CreateBlogActions,
    dispatch
  );

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(PreviewComponent);
