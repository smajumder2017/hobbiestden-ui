/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IHobbiestDenAppState } from "../../redux/reducers";
import BlogActions from "../../redux/actions/blogsActions";
import { GetConnectDispatchPropsType } from "../../utils/actionCreators";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Sections } from "../../components/Sections";
import { BloggerInfo } from "../../components/BloggerInfo/BloggerInfo";

import "./BlogComponent.css";
import { queryParamsToObject } from "../../utils/urlUtils";
import { Row, Col } from "antd";

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof BlogActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = TStateProps & TDispatchProps & RouteComponentProps<undefined>;

export const BlogViewComponent: React.FC<TAllProps> = (props) => {
  const { title } = queryParamsToObject(props.history.location.search) as {
    title: string;
  };
  useEffect(() => {
    (async () => {
      try {
        await props.fetchBlogs({ status: "APPROVED" });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [title]);
  const blog =
    props.blogs.data &&
    props.blogs.data.find(
      (blog) => blog.content.title === title.split('-').join(' ')
    );
  
  if (blog) {
    const fullName = blog.creator.firstName + " " + blog.creator.lastName
    return (
      <div className="blog-container">
        <Row>
          <Col span={5}></Col>
          <Col span={14}>
            {blog.content.coverImageUrl && (
              <>
                <div>
                  <img
                    src={blog.content.coverImageUrl}
                    alt=""
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <BloggerInfo userName={fullName} blogDate="10th June, 2020" userImageUrl={blog.creator.image} />
              </>
            )}
            <div className="title">{blog.content.title}</div>
            <div className="subtitle">{blog.content.subTitle}</div>
            {!blog.content.coverImageUrl && (
              <div style={{marginTop: '40px'}}>
                <BloggerInfo userName={fullName} blogDate="10th June, 2020" userImageUrl={blog.creator.image} />
              </div>
              
            )}
            {blog.content.sections && (
              <Sections sections={blog.content.sections} />
            )}
          </Col>
          <Col span={5}></Col>
        </Row>
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state: IHobbiestDenAppState) => {
  return {
    auth: state.auth,
    blogs: state.blogs,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreators, TDispatchProps>(
    BlogActions,
    dispatch
  );

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(BlogViewComponent);
