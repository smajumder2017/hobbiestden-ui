/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Carousel, Row, Col, Tag, Card, Divider, Button } from "antd";
import { IHobbiestDenAppState } from "../../redux/reducers";
import BlogActions from "../../redux/actions/blogsActions";
import { GetConnectDispatchPropsType } from "../../utils/actionCreators";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import ImageViewer from "../../components/ImageViewer";
import { List, Avatar } from "antd";
// import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { IBlogSections } from "../../models/CreateBlogModel";
import { Link } from "react-router-dom";
import "./Home.css";

const prettyDate = require("pretty-date");

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreator = typeof BlogActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreator>;

type TAllProps = TStateProps & TDispatchProps;

// const IconText = (args: any) => (
//   <Space>
//     {React.createElement(args.icon)}
//     {args.text}
//   </Space>
// );
const HomeContainer: React.FC<TAllProps> = (props) => {
  function onChange(currentIndex: number) {}

  useEffect(() => {
    (async () => {
      try {
        await props.fetchBlogs({ status: "PUBLISHED" });
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
        avatarImage: blog.user.image,
        userShortName:
          blog.user.firstName.charAt(0) + " " + blog.user.lastName.charAt(0),
        userName: blog.user.firstName + " " + blog.user.lastName,
        updatedAt: blog.updatedAt,
      }))
    : [];

  return (
    <>
      <Carousel afterChange={onChange} autoplay>
        <div>
          <div style={{ height: "400px", lineHeight: "400px" }}>
            <h3>1</h3>
          </div>
        </div>
        <div>
          <div style={{ height: "400px", lineHeight: "400px" }}>
            <h3>2</h3>
          </div>
        </div>
        <div>
          <div style={{ height: "400px", lineHeight: "400px" }}>
            <h3>3</h3>
          </div>
        </div>
        <div>
          <div style={{ height: "400px", lineHeight: "400px" }}>
            <h3>4</h3>
          </div>
        </div>
      </Carousel>
      <div className="home-content">
        <Divider>
          <h2>About Learn Sageway</h2>
        </Divider>
        <Row gutter={16} style={{ textAlign: "center" }}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card hoverable title={"Create a Blog"}>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="primary">Become a Blogger</Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card hoverable title={"Post Your Stories"}>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="primary">Post Stories</Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card hoverable title={"Become a tutor with us"}>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="primary">Apply Now</Button>
              </div>
            </Card>
          </Col>
        </Row>
        <br></br>
        <Divider>
          <h2>Recently Posted</h2>
        </Divider>
        <Row>
          <Col span={24}>
            <List
              // header={<h2>Latest Blogs</h2>}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4,
              }}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 4,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.blogId}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/blog?title=${item.title.split(" ").join("-")}`}
                  >
                    <Card
                      hoverable
                      style={{ width: 350 }}
                      cover={
                        <ImageViewer
                          src={item.image}
                          style={{
                            width: "350px",
                            height: "170px",
                            objectFit: "cover",
                          }}
                        />
                      }
                    >
                      <div className="card-title">
                        {/* <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/blog?title=${item.title.split(" ").join("-")}`}
                      > */}
                        {item.title}
                        {/* </Link> */}
                      </div>
                      <div className="flex-row" style={{ fontStyle: "italic" }}>
                        <div className="flex-cell">
                          {item.avatarImage ? (
                            <Avatar size={20} src={item.avatarImage} />
                          ) : (
                            <Avatar size={20}>{item.userShortName}</Avatar>
                          )}
                        </div>
                        <div className="flex-cell">{item.userName}</div>
                      </div>
                      <div style={{marginTop: '5px'}}>
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
                      <div style={{marginTop: '5px', fontSize: '12px'}}>
                        <div className="flex-cell">
                          Published{" "}
                          {prettyDate.format(new Date(item.updatedAt))}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </List.Item>
              )}
            />
          </Col>
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
  bindActionCreators<TBindActionCreator, TDispatchProps>(BlogActions, dispatch);

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
