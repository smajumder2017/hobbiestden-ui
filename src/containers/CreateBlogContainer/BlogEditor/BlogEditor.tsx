/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Input, Divider, Collapse, Form, TreeSelect } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { IHobbiestDenAppState } from "../../../redux/reducers";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IContentMeta } from "../../../models/CreateBlogModel";
import CreateBlogActions from "../../../redux/actions/createBlogActions";
import FileUploadActions from "../../../redux/actions/imageUploadAction";
import { GetConnectDispatchPropsType } from "../../../utils/actionCreators";
import { FileUploader } from "./EditorImageUploader";
import { SectionContent } from "./SectionContentEditorComponent";
import ImageViewer from "../../../components/ImageViewer";

import "./BlogEditor.css";

const { Panel } = Collapse;
const FormItem = Form.Item;

interface IOwnProps {
  blogId: string;
}

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof CreateBlogActions & typeof FileUploadActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = TStateProps & TDispatchProps & IOwnProps;

const BlogEditor: React.FC<TAllProps> = (props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      if (props.createBlog.data) {
        const { title, subTitle, coverImageUrl } = props.createBlog.data;
        if (title || subTitle || coverImageUrl) saveBlog();
      }
    })();
  }, [
    props.createBlog.data?.title,
    props.createBlog.data?.subTitle,
    props.createBlog.data?.coverImageUrl,
  ]);

  const saveBlog = () => {
    if (props.createBlog.data) {
      const content = { ...props.createBlog.data };
      delete content.tempCoverImage;
      console.log(content);
      props.saveBlog({
        blogId: props.blogId,
        content,
      });
    }
  };

  const handleContentTypeUpdate = (
    value: "none" | "text" | "image" | "video" | "code",
    sectionIndex: number,
    subSection: "left" | "right" | "center"
  ) => {
    props.updateContentType({ sectionIndex, subSection, contentType: value });
    saveBlog();
  };

  const handleContentValueUpdate = (
    content: string,
    sectionIndex: number,
    subSection: "left" | "right" | "center"
  ) => {
    props.updateContent({ sectionIndex, content, subSection });
  };

  const handleSectionHeadingChange = (
    heading: string,
    sectionIndex: number
  ) => {
    props.updateSectionHeading({ heading, sectionIndex });
  };

  const handleBackgroundColorChange = (
    value: string,
    sectionIndex: number,
    subSection: "left" | "right" | "center"
  ) => {
    const contentMeta: IContentMeta = {
      backgroundColor: value || "#FFF",
      borderColor: null,
      imageHeight: null,
      imageWidth: null,
    };
    props.updateContentMeta({ contentMeta, sectionIndex, subSection });
  };
  const handleBorderColorChange = (
    value: string,
    sectionIndex: number,
    subSection: "left" | "right" | "center"
  ) => {
    const contentMeta: IContentMeta = {
      backgroundColor: null,
      borderColor: value || "#FFF",
      imageHeight: null,
      imageWidth: null,
      codeTheme: "",
      codeLanguage: "",
    };
    props.updateContentMeta({ contentMeta, sectionIndex, subSection });
  };

  const handleAdjustImageChange = (
    value: string,
    sectionIndex: number,
    subSection: "left" | "right" | "center"
  ) => {
    const contentMeta: IContentMeta = {
      backgroundColor: null,
      borderColor: null,
      imageHeight: null,
      imageWidth: value,
      codeTheme: "",
      codeLanguage: "",
    };
    props.updateContentMeta({ contentMeta, sectionIndex, subSection });
  };

  const handleCodeThemeChange = (
    value: string,
    sectionIndex: number,
    subSection: "left" | "right" | "center"
  ) => {
    const contentMeta: IContentMeta = {
      backgroundColor: null,
      borderColor: null,
      imageHeight: null,
      imageWidth: null,
      codeTheme: value,
      codeLanguage: "",
    };
    props.updateContentMeta({ contentMeta, sectionIndex, subSection });
  };

  const handleCodeLanguageChange = (
    value: string,
    sectionIndex: number,
    subSection: "left" | "right" | "center"
  ) => {
    const contentMeta: IContentMeta = {
      backgroundColor: null,
      borderColor: null,
      imageHeight: null,
      imageWidth: null,
      codeTheme: "",
      codeLanguage: value,
    };
    props.updateContentMeta({ contentMeta, sectionIndex, subSection });
  };

  const handleCoverImageUpload = async (file: File, crop: boolean) => {
    setLoader(true);
    const payload = new FormData();
    payload.set("image", file);
    payload.set("fileName", file.name);
    payload.set("imageType", "cover");
    try {
      const {
        payload: {
          res: { url },
        },
      } = await props.uploadImage(payload);
      if (crop) {
        props.updateTempCoverImage(url);
      } else {
        props.updateCoverImage(url);
        props.updateTempCoverImage("");
      }
    } catch (error) {}
    setLoader(false);
  };

  const hanldeContentImageUpload = async (
    file: File,
    sectionIndex: number,
    subSection: "left" | "right" | "center"
  ) => {
    const payload = new FormData();
    payload.set("image", file);
    payload.set("fileName", file.name);
    payload.set("imageType", "cover");
    try {
      const {
        payload: {
          res: { url },
        },
      } = await props.uploadImage(payload);
      props.updateContentImage({ sectionIndex, subSection, content: url });
    } catch (error) {}
  };

  return (
    <div className="editor">
      <Divider orientation="left">
        <h3>Blog Editor</h3>
      </Divider>
      <div className="container">
        <Form style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <FormItem>
            <Input
              addonBefore="Title"
              placeholder="Enter Blog Title"
              onChange={(e) => props.updateTitle(e.target.value)}
              value={props.createBlog.data?.title}
            />
          </FormItem>
          <FormItem>
            <Input
              placeholder="Enter Blog Subtitle"
              addonBefore="Subtitle"
              onChange={(e) => props.updateSubtitle(e.target.value)}
              value={props.createBlog.data?.subTitle}
            />
          </FormItem>
          <FormItem>
            {props.createBlog.data?.coverImageUrl && (
              <ImageViewer
                src={props.createBlog.data.coverImageUrl}
                handleRemoveImage={() => props.updateCoverImage("")}
              />
            )}
            <FileUploader
              value={props.createBlog.data?.tempCoverImage || ""}
              onFileSelect={(file) => props.updateTempCoverImage(file)}
              handleUpload={(file) => handleCoverImageUpload(file, true)}
              crop={true}
              handleCropSubmit={(file) => handleCoverImageUpload(file, false)}
              buttonText="Upload Cover Image"
              loader={loader}
            />
          </FormItem>
          <FormItem>
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              value={tags}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Select Tags"
              allowClear
              multiple
              onChange={(value) => setTags(value)}
            >
              <TreeSelect.TreeNode
                value="python"
                title="Python"
              ></TreeSelect.TreeNode>
              <TreeSelect.TreeNode
                value="Javascript"
                title="Javascript"
              ></TreeSelect.TreeNode>
              <TreeSelect.TreeNode
                value="React"
                title="React"
              ></TreeSelect.TreeNode>
              <TreeSelect.TreeNode
                value="ReactJS"
                title="ReactJS"
              ></TreeSelect.TreeNode>
              <TreeSelect.TreeNode
                value="ReactNative"
                title="ReactNative"
              ></TreeSelect.TreeNode>
            </TreeSelect>
          </FormItem>
        </Form>
        <Divider orientation="left">
          <h4>Sections</h4>
        </Divider>
        <Collapse defaultActiveKey={[0]} bordered={false}>
          {props.createBlog.data?.sections.map((section, index) => (
            <Panel
              key={index}
              header={section.header || `Section ${index + 1}`}
            >
              <Input
                placeholder="Enter Heading"
                addonBefore="Heading"
                onChange={(e) =>
                  handleSectionHeadingChange(e.target.value, index)
                }
                onBlur={saveBlog}
              />
              <div>
                <div style={{ marginTop: "10px" }}>
                  <b>Left Content</b>
                </div>

                <SectionContent
                  useSave={saveBlog}
                  {...section.subSections.left}
                  handleBackgroundColorChange={(value) =>
                    handleBackgroundColorChange(value, index, "left")
                  }
                  handleBorderColorChange={(value) =>
                    handleBorderColorChange(value, index, "left")
                  }
                  handleContentChange={(value) =>
                    handleContentValueUpdate(value, index, "left")
                  }
                  handleContentTypeChange={(value) =>
                    handleContentTypeUpdate(value, index, "left")
                  }
                  handleImageUpload={(file) =>
                    hanldeContentImageUpload(file, index, "left")
                  }
                  handleCodeThemeChange={(value) =>
                    handleCodeThemeChange(value, index, "left")
                  }
                  handleCodeLanguageChange={(value) =>
                    handleCodeLanguageChange(value, index, "left")
                  }
                  handleAdjustImageSize={(value)=>handleAdjustImageChange(value, index, "left")}
                />
              </div>
              <div>
                <div style={{ marginTop: "10px" }}>
                  <b>Center Content</b>
                </div>
                <SectionContent
                  useSave={saveBlog}
                  {...section.subSections.center}
                  handleBackgroundColorChange={(value) =>
                    handleBackgroundColorChange(value, index, "center")
                  }
                  handleBorderColorChange={(value) =>
                    handleBorderColorChange(value, index, "center")
                  }
                  handleContentChange={(value) =>
                    handleContentValueUpdate(value, index, "center")
                  }
                  handleContentTypeChange={(value) =>
                    handleContentTypeUpdate(value, index, "center")
                  }
                  handleImageUpload={(file) =>
                    hanldeContentImageUpload(file, index, "center")
                  }
                  handleCodeThemeChange={(value) =>
                    handleCodeThemeChange(value, index, "center")
                  }
                  handleCodeLanguageChange={(value) =>
                    handleCodeLanguageChange(value, index, "center")
                  }
                  handleAdjustImageSize={(value)=>handleAdjustImageChange(value, index, "center")}
                />
              </div>
              <div>
                <div style={{ marginTop: "10px" }}>
                  <b>Right Content</b>
                </div>
                <SectionContent
                  useSave={saveBlog}
                  {...section.subSections.right}
                  handleBackgroundColorChange={(value) =>
                    handleBackgroundColorChange(value, index, "right")
                  }
                  handleBorderColorChange={(value) =>
                    handleBorderColorChange(value, index, "right")
                  }
                  handleContentChange={(value) =>
                    handleContentValueUpdate(value, index, "right")
                  }
                  handleContentTypeChange={(value) =>
                    handleContentTypeUpdate(value, index, "right")
                  }
                  handleImageUpload={(file) =>
                    hanldeContentImageUpload(file, index, "right")
                  }
                  handleCodeThemeChange={(value) =>
                    handleCodeThemeChange(value, index, "right")
                  }
                  handleCodeLanguageChange={(value) =>
                    handleCodeLanguageChange(value, index, "right")
                  }
                  handleAdjustImageSize={(value)=>handleAdjustImageChange(value, index, "center")}
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  type="dashed"
                  danger
                  style={{ width: "100%" }}
                  icon={<MinusCircleOutlined />}
                  onClick={() => {props.removeSection(index); saveBlog();}}
                >
                  Remove
                </Button>
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircleOutlined />}
        onClick={() => {
          props.addSection();
          saveBlog();
        }}
      >
        Add Section
      </Button>
    </div>
  );
};

const mapStateToProps = (state: IHobbiestDenAppState) => {
  return {
    createBlog: state.createBlog,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreators, TDispatchProps>(
    { ...CreateBlogActions, ...FileUploadActions },
    dispatch
  );

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(BlogEditor);
