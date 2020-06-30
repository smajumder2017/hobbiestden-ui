/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IHobbiestDenAppState } from "../../redux/reducers";
import { Dispatch, bindActionCreators } from "redux";
import BloggerActions from "../../redux/actions/bloggerActions";
import FileUploadActions from "../../redux/actions/imageUploadAction";
import { GetConnectDispatchPropsType } from "../../utils/actionCreators";
import { RouteComponentProps } from "react-router-dom";
import {
  List,
  Space,
  Avatar,
  Row,
  Col,
  Button,
  Empty,
  Form,
  Input,
  Select,
  Modal,
  notification,
  Card,
  Popconfirm,
  Tag,
} from "antd";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  PlusOutlined,
  SnippetsOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import ImageViewer from "../../components/ImageViewer";

import "./BloggerContainer.css";

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof BloggerActions & typeof FileUploadActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = TStateProps & TDispatchProps & RouteComponentProps;

const IconText = (args: any) => (
  <Space>
    {React.createElement(args.icon)}
    {args.text}
  </Space>
);

const BloggerContainer: React.FC<TAllProps> = (props) => {
  const [loader, setLoader] = useState(false);
  const [createBlogModal, setCreateBlogModal] = useState(false);
  const [createBlogForm, setCreateBlogForm] = useState<{
    title: string;
    category?: string;
    thumbnailImage: string;
  }>({
    title: "",
    category: undefined,
    thumbnailImage: "",
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [categorySearch, setCategorySearch] = useState("");

  useEffect(() => {
    (async () => {
      await props.fetchBlogs({});
      const {
        payload: { res },
      } = await props.fetchCategories({});
      const categoryList = res.map((item) => item.category);
      setCategories(categoryList);
    })();
  }, []);

  const handleTitleChange = (value: string) => {
    setCreateBlogForm((prev) => ({ ...prev, title: value }));
  };

  const handleCategoryChange = (value: string) => {
    setCreateBlogForm((prev) => ({ ...prev, category: value }));
  };

  const handleThumbnailImageUpload = async (file: File) => {
    const payload = new FormData();
    payload.set("image", file);
    payload.set("fileName", file.name);
    payload.set("imageType", "thumbnail");
    try {
      const {
        payload: {
          res: { url },
        },
      } = await props.uploadImage(payload);
      setCreateBlogForm((prev) => ({ ...prev, thumbnailImage: url }));
    } catch (error) {}
  };

  const handleCreateBlog = async () => {
    setLoader(true);
    try {
      const {payload:{res:{blogId}}} = await props.createBlog(createBlogForm);
      notification.open({
        placement: "bottomLeft",
        message: "Blog Created",
        description: "Start editing your blog...",
        type: "success",
      });
      props.history.push(`/blogger/create/${blogId}`)
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
    setCreateBlogModal(false);
  };

  const handleSearch = (value: string) => {
    if (value) {
      setCategorySearch(value);
    } else {
      setCategorySearch("");
    }
  };

  const data = props.blogger.data
    ? props.blogger.data.map((blog) => ({
        title: blog.content.title,
        subTitle: blog.content.subTitle,
        image:
          blog.thumbnailImage ||
          "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        status: blog.status,
        blogId: blog.blogId,
        category: blog.category,
        avatarImage: blog.creator.image,
        userShortName:
          blog.creator.firstName.charAt(0) +
          " " +
          blog.creator.lastName.charAt(0),
      }))
    : [];

  return (
    <div className="home-content">
      {props.blogger.data?.length === 0 ? (
        <Row>
          <Col span={18}>
            <h2>Your Blogs</h2>
            <Card style={{ width: "100%" }}>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    You have not crated any blogs yet !{" "}
                    <a href="#API">Description</a>
                  </span>
                }
              >
                <Button type="primary" onClick={() => setCreateBlogModal(true)}>
                  Create Now
                </Button>
              </Empty>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={18}>
            <List
              header={<h2>Your Blogs</h2>}
              itemLayout="vertical"
              loading={props.blogger.asyncStatus === "LOADING"}
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 6,
              }}
              footer={
                <div style={{ display: "flex", padding: "0px 20px" }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => setCreateBlogModal(true)}
                  >
                    Create New Blog
                  </Button>
                </div>
              }
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={
                    !(item.status === "CREATED" || item.status === "APPROVED")
                      ? [
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
                        ]
                      : []
                  }
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
                    avatar={
                      item.avatarImage ? (
                        <Avatar src={item.avatarImage} />
                      ) : (
                        <Avatar>{item.userShortName}</Avatar>
                      )
                      // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={item.title}
                    description={item.subTitle}
                  />
                  {item.category && (
                    <div>
                      <Tag style={{ textTransform: "capitalize" }} color="blue">
                        {item.category}
                      </Tag>
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {item.status === "CREATED" && (
                        <div style={{ marginRight: "5px" }}>
                          <Button type="primary" icon={<SnippetsOutlined />}>
                            Request Approval
                          </Button>
                        </div>
                      )}
                      <div style={{ marginRight: "5px" }}>
                        <Button
                          type="default"
                          icon={<EditOutlined />}
                          onClick={() =>
                            props.history.push(`blogger/create/${item.blogId}`)
                          }
                        >
                          Edit
                        </Button>
                      </div>
                      <Popconfirm
                        placement="top"
                        title={"You want to delete this blog?"}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button icon={<DeleteOutlined />}>Remove</Button>
                      </Popconfirm>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      )}
      <Modal
        title="Create New blog"
        visible={createBlogModal}
        onCancel={() => setCreateBlogModal(false)}
        closeIcon={<></>}
        footer={false}
      >
        <Form style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <Form.Item>
            <Input
              addonBefore="Title"
              placeholder="Enter Blog Title"
              onChange={(e) => handleTitleChange(e.target.value)}
              value={createBlogForm.title}
            />
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <label>Category</label>
              </div>
              <Select
                showSearch
                value={createBlogForm.category}
                placeholder={"Choose Category of Your Blog"}
                // style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={(value) => handleCategoryChange(value)}
                notFoundContent={null}
              >
                {categories
                  .filter((item) => item.includes(categorySearch))
                  .map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
              </Select>
            </div>
          </Form.Item>
          <Form.Item>
            <ImageUploader
              placeholder="Upload Blog Thumbnail"
              value={createBlogForm.thumbnailImage}
              handleImageUpload={handleThumbnailImageUpload}
            />
          </Form.Item>
        </Form>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ marginRight: "10px" }}>
            <Button type="primary" onClick={handleCreateBlog} loading={loader}>
              Create
            </Button>
          </div>
          <div>
            <Button type="default" onClick={() => setCreateBlogModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IHobbiestDenAppState) => {
  return {
    blogger: state.blogger,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreators, TDispatchProps>(
    { ...BloggerActions, ...FileUploadActions },
    dispatch
  );

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(BloggerContainer);
