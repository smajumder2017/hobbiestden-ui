/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Carousel, Row, Col, Tag } from "antd";
import { IHobbiestDenAppState } from "../../redux/reducers";
import BlogActions from "../../redux/actions/blogsActions";
import { GetConnectDispatchPropsType } from "../../utils/actionCreators";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import ImageViewer from "../../components/ImageViewer";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import "./Home.css";
import { IBlogSections } from "../../models/CreateBlogModel";
import { Link } from "react-router-dom";

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof BlogActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = TStateProps & TDispatchProps;

const IconText = (args: any) => (
  <Space>
    {React.createElement(args.icon)}
    {args.text}
  </Space>
);
const HomeContainer: React.FC<TAllProps> = (props) => {
  function onChange(currentIndex: number) {}

  useEffect(() => {
    (async () => {
      try {
        await props.fetchBlogs({ status: "APPROVED" });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const getContent = (sections: IBlogSections[]): string => {
    let text = "";
    for (const section of sections) {
      if (
        section.subSections["left"].contentType === "text" ||
        section.subSections["center"].contentType === "text" ||
        section.subSections["right"].contentType === "text"
      ) {
        text =
          section.subSections["left"].contentValue ||
          section.subSections["center"].contentValue ||
          section.subSections["right"].contentValue;
        break;
      }
    }
    return text;
  };

  const data = props.blogs.data
    ? props.blogs.data.map((blog) => ({
        title: blog.content.title,
        subTitle: blog.content.subTitle,
        image:
          blog.thumbnailImage ||
          "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        status: blog.status,
        blogId: blog.blogId,
        category: blog.category,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: getContent(blog.content.sections),
        avatarImage: blog.creator.image,
        userShortName:
          blog.creator.firstName.charAt(0) +
          " " +
          blog.creator.lastName.charAt(0),
      }))
    : [];

  return (
    <>
      <Carousel afterChange={onChange} autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
      <div className="home-content">
        <Row>
          <Col span={14}>
            <List
              header={<h2>Latest Blogs</h2>}
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText
                      icon={StarOutlined}
                      text="156"
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={LikeOutlined}
                      text="156"
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text="2"
                      key="list-vertical-message"
                    />,
                  ]}
                  extra={
                    <ImageViewer
                      src={item.image}
                      style={{
                        width: "272px",
                        height: "170px",
                        objectFit: "contain",
                      }}
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={item.avatarImage ? (
                      <Avatar src={item.avatarImage} />
                    ) : (
                      <Avatar>{item.userShortName}</Avatar>
                    )}
                    title={
                      <Link
                        to={`/blog?title=${item.title
                          .split(" ")
                          .join("-")}`}
                      >
                        {item.title}
                      </Link>
                    }
                    description={item.subTitle}
                  />
                  <div>
                    {item.category && (
                      <div>
                        <Tag
                          style={{ textTransform: "capitalize" }}
                          color="blue"
                        >
                          {item.category}
                        </Tag>
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </Col>
          <Col span={10}>col</Col>
        </Row>
      </div>
    </>
  );
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
)(HomeContainer);
