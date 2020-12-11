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
  // Space,
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
  Tooltip,
  message,
} from "antd";
import {
  PlusOutlined,
  SnippetsOutlined,
  EditOutlined,
  DeleteOutlined,
  SendOutlined,
  ScissorOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import ImageViewer from "../../components/ImageViewer";

import "./BloggerContainer.css";

const prettyDate = require("pretty-date");

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreator = typeof BloggerActions & typeof FileUploadActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreator>;

type TAllProps = TStateProps & TDispatchProps & RouteComponentProps;

// const IconText = (args: any) => (
//   <Space>
//     {React.createElement(args.icon)}
//     {args.text}
//   </Space>
// );

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
      const content = props.createBlogData;
      delete content?.tempCoverImage;
      const payload = { ...createBlogForm, content };
      const {
        payload: {
          res: { blogId },
        },
      } = await props.createBlog(payload);
      notification.open({
        placement: "bottomLeft",
        message: "Blog Created",
        description: "Start editing your blog...",
        type: "success",
      });
      props.history.push(`/blogger/create/${blogId}`);
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

  const updateBlogStatus = async (
    blogId: string,
    status: "CREATED" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "NOT APPROVED"
  ) => {
    try {
      await props.updateBlogStatus({ blogId, status });
    } catch (error) {
      console.log(error);
    }
  };

  const data = props.blogger.data
    ? props.blogger.data.map((blog) => ({
        title: blog.title,
        subTitle: blog.content.subTitle,
        image:
          blog.thumbnailImage ||
          "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        status: blog.status,
        blogId: blog.blogId,
        category: blog.category,
        avatarImage: blog.user.image,
        userShortName:
          blog.user.firstName.charAt(0) + " " + blog.user.lastName.charAt(0),
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        publishDate: blog.publishDate,
      }))
    : [];

  const renderBlogActions = (
    blogId: string,
    status: "CREATED" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "NOT APPROVED"
  ) => {
    switch (status) {
      case "CREATED":
        return (
          <Tooltip title="Submit For Approval">
            <SnippetsOutlined
              key="setting"
              onClick={() => updateBlogStatus(blogId, "SUBMITTED")}
            />
          </Tooltip>
        );
      case "SUBMITTED":
        return (
          <Tooltip title="Undo Submit">
            <UndoOutlined
              key="setting"
              onClick={() => updateBlogStatus(blogId, "CREATED")}
            />
          </Tooltip>
        );
      case "APPROVED":
        return (
          <Tooltip title="Click to Publish">
            <SendOutlined
              onClick={() => updateBlogStatus(blogId, "PUBLISHED")}
            />
          </Tooltip>
        );
      case "PUBLISHED":
        return (
          <Tooltip title="Click to Unpublish">
            <ScissorOutlined
              onClick={() => updateBlogStatus(blogId, "SUBMITTED")}
            />
          </Tooltip>
        );
      default:
        break;
    }
  };

  const renderStatus = (
    status: "CREATED" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "NOT APPROVED"
  ) => {
    switch (status) {
      case "CREATED":
        return <Tag color="green">{status}</Tag>;
      case "SUBMITTED":
        return <Tag color="processing">{status}</Tag>;
      case "APPROVED":
        return <Tag color="success">{status}</Tag>;
      case "PUBLISHED":
        return <Tag color="gold">{status}</Tag>;
      case "NOT APPROVED":
        return <Tag color="error">{status}</Tag>;
      default:
        break;
    }
  };

  const handleEditClick = (
    blogId: string,
    status: "CREATED" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "NOT APPROVED"
  ) => {
    if (status === "PUBLISHED") {
      message.error(
        "Please unpublish the blog before editing. (Note: If you unpublish the blog it again needs to be reviewed, status will be changed to SUBMITTED)",
        5
      );
      return;
    }
    props.history.push(`blogger/create/${blogId}`);
  };

  return (
    <div className="blog-content">
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
            <div
              style={{
                display: "flex",
                padding: "10px 20px",
                justifyContent: "space-between",
              }}
            >
              <h2>Your Blogs</h2>
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => setCreateBlogModal(true)}
              >
                Create New Blog
              </Button>
            </div>
            <List
              loading={props.blogger.asyncStatus === "LOADING"}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 4,
              }}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 8,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.blogId}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    // style={{ width: 300 }}
                    cover={
                      <ImageViewer
                        src={item.image}
                        style={{
                          width: "100%",
                          height: "170px",
                          objectFit: "cover",
                        }}
                      />
                    }
                    actions={[
                      renderBlogActions(item.blogId, item.status),
                      <Tooltip
                        title={
                          item.status === "PUBLISHED"
                            ? "Unpublish To Edit"
                            : "Click to Edit"
                        }
                      >
                        <EditOutlined
                          key="edit"
                          onClick={() =>
                            handleEditClick(item.blogId, item.status)
                          }
                        />
                      </Tooltip>,
                      <Popconfirm
                        placement="top"
                        title={"You want to delete this blog?"}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined key="delete" />
                      </Popconfirm>,
                    ]}
                  >
                    <div className="card-title">{item.title}</div>
                    <div style={{ margin: "5px 5px 5px 0px" }}>
                      {renderStatus(item.status)}
                    </div>
                    <div>
                      {item.category && (
                        <div
                          style={{
                            fontStyle: "italic",
                            textTransform: "capitalize",
                          }}
                        >
                          {`On `} {<b>{item.category}</b>}{" "}
                          {`, Last Edited at ${prettyDate.format(
                            new Date(item.updatedAt)
                          )}`}
                        </div>
                      )}
                    </div>
                  </Card>
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
    createBlogData: state.createBlog.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreator, TDispatchProps>(
    { ...BloggerActions, ...FileUploadActions },
    dispatch
  );

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(BloggerContainer);
