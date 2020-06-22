import React, { useState } from "react";
import {
  Button,
  Input,
  Divider,
  Collapse,
  Form,
  TreeSelect,
} from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { IHobbiestDenAppState } from "../../../redux/reducers";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IContentMeta } from "../../../models/CreateBlogModel";
import CreateBlogActions from "../../../redux/actions/createBlogActions";
import FileUploadActions from "../../../redux/actions/imageUploadAction";
import { GetConnectDispatchPropsType } from "../../../utils/actionCreators";
import { FileUploader } from "./ImageUploader";
import {SectionContent} from './SectionContentEditorComponent';

import "./BlogEditor.css";

const { Panel } = Collapse;
const FormItem = Form.Item;

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof CreateBlogActions & typeof FileUploadActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = TStateProps & TDispatchProps;

// interface ISectionContentProps extends IContent {
//   handleContentTypeChange: (value: "none" | "text" | "image" | "video") => void;
//   handleContentChange: (value: string) => void;
//   handleBackgroundColorChange?: (value: string) => void;
//   handleBorderColorChange?: (value: string) => void;
//   handleImageUpload?: (file: File) => Promise<void>;
// }

// const SectionContent: React.FC<ISectionContentProps> = (props) => {
//   const [editorState, setEditorState] = useState(false);

//   const handleEditorClose = () => setEditorState((prv) => !prv);

//   const handleContentTypeChange = (
//     value: "none" | "text" | "image" | "video"
//   ) => {
//     props.handleContentTypeChange(value);
//   };

//   const handleContentChange = (value: string) => {
//     props.handleContentChange(value);
//   };

//   const handleBackgroundColorChange = (value: string) => {
//     if (props.handleBackgroundColorChange) {
//       props.handleBackgroundColorChange(value);
//     }
//   };

//   const handleBorderColorChange = (value: string) => {
//     if (props.handleBorderColorChange) {
//       props.handleBorderColorChange(value);
//     }
//   };

//   const handleImageUpload = async (file: File) => {
//     if (props.handleImageUpload) {
//       props.handleImageUpload(file);
//     }
//   };
//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div>Content Type</div>
//         <Select
//           defaultValue={props.contentType}
//           onChange={(value) => handleContentTypeChange(value)}
//         >
//           <Select.Option value="none">None</Select.Option>
//           <Select.Option value="text">Text</Select.Option>
//           <Select.Option value="image">Image</Select.Option>
//           <Select.Option value="video">Video</Select.Option>
//           <Select.Option value="code">Code</Select.Option>
//         </Select>
//       </div>
//       {props.contentType === "text" && props.contentValue && (
//         <>
//           <div style={{ marginTop: "10px" }}>
//             <Card style={{ width: "100%" }}>
//               <div
//                 style={{
//                   height: "70px",
//                   whiteSpace: "nowrap",
//                   overflowY: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 {parse(props.contentValue)}
//               </div>
//             </Card>
//           </div>

//           <div style={{ marginTop: "10px" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginTop: "10px",
//               }}
//             >
//               <div style={{ flex: 1 }}>
//                 <Input
//                   addonBefore="Background Color"
//                   placeholder="#Hex Code"
//                   style={{ width: "100%" }}
//                   onChange={(e) => handleBackgroundColorChange(e.target.value)}
//                 />
//               </div>
//               <div
//                 style={{
//                   height: "30px",
//                   width: "30px",
//                   borderRadius: "50%",
//                   backgroundColor: props.contentMeta.backgroundColor || "#FFF",
//                   marginLeft: "5px",
//                 }}
//               ></div>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginTop: "10px",
//               }}
//             >
//               <div style={{ flex: 1 }}>
//                 <Input
//                   addonBefore="Border Color"
//                   placeholder="#Hex Code"
//                   style={{ width: "100%" }}
//                   onChange={(e) => handleBorderColorChange(e.target.value)}
//                 />
//               </div>
//               <div
//                 style={{
//                   height: "30px",
//                   width: "30px",
//                   borderRadius: "50%",
//                   backgroundColor: props.contentMeta.borderColor || "#FFF",
//                   marginLeft: "5px",
//                 }}
//               ></div>
//             </div>
//           </div>
//         </>
//       )}
//       {props.contentType === "text" && (
//         <div style={{ marginTop: "10px" }}>
//           <Button
//             type="dashed"
//             style={{ width: "100%" }}
//             onClick={handleEditorClose}
//           >
//             Open Editor
//           </Button>
//         </div>
//       )}
//       {props.contentType === "image" && (
//         <>
//           {props.contentValue && <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               marginTop: "10px",
//             }}
//           >
//             <img src={props.contentValue} alt="" className="contentImage" />
//           </div>}
//           <div style={{ marginTop: "10px" }}>
//             <FileUploader
//               value={props.contentValue}
//               handleUpload={(file) => handleImageUpload(file)}
//               crop={false}
//               buttonText="Upload Image"
//             />
//           </div>
//         </>
//       )}
//       {
//         props.contentType === "video" && (
//           <>
//           <Input
//                   addonBefore="Link"
//                   placeholder="Enter Youtube Link"
//                   style={{ width: "100%" }}
//                   onChange={(e) => handleContentChange(e.target.value)}
//                 />
//           </>
//         )
//       }

//       <TextEditor
//         drwaerState={editorState}
//         handleClose={handleEditorClose}
//         onEditorChange={handleContentChange}
//       />
//     </div>
//   );
// };
const BlogEditor: React.FC<TAllProps> = (props) => {
  const [tags, setTags] = useState<string[]>([]);
  const handleContentTypeUpdate = (
    value: "none" | "text" | "image" | "video",
    sectionIndex: number,
    subSection: "left" | "right" | "center"
  ) => {
    props.updateContentType({ sectionIndex, subSection, contentType: value });
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
    };
    props.updateContentMeta({ contentMeta, sectionIndex, subSection });
  };

  const handleCoverImageUpload = async (file: File, crop: boolean) => {
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
      }
    } catch (error) {}
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
              addonBefore="Blog Title"
              placeholder="Enter Title"
              onChange={(e) => props.updateTitle(e.target.value)}
              value={props.createBlog.data?.title}
            />
          </FormItem>
          <FormItem>
            <Input
              placeholder="Enter Sub Title"
              addonBefore="Blog Subtitle"
              onChange={(e) => props.updateSubtitle(e.target.value)}
              value={props.createBlog.data?.subTitle}
            />
          </FormItem>
          <FormItem>
            {props.createBlog.data?.coverImageUrl && (
              <div style={{ marginBottom: "10px", position: "relative" }}>
                <Button
                  danger
                  type="dashed"
                  onClick={() => {
                    props.updateCoverImage("");
                  }}
                  icon={<CloseCircleFilled />}
                  style={{ position: "absolute", right: 0 }}
                ></Button>
                <img
                  style={{ width: "100%", height: "auto" }}
                  src={props.createBlog.data?.coverImageUrl}
                  alt="not avilable"
                />
              </div>
            )}
            <FileUploader
              value={props.createBlog.data?.tempCoverImage || ""}
              onFileSelect={(file) => props.updateTempCoverImage(file)}
              handleUpload={(file) => handleCoverImageUpload(file, true)}
              crop={true}
              handleCropSubmit={(file) => handleCoverImageUpload(file, false)}
              buttonText="Upload Cover Image"
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
              />
              <div>
                <div style={{ marginTop: "10px" }}>
                  <b>Left Content</b>
                </div>

                <SectionContent
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
                />
              </div>
              <div>
                <div style={{ marginTop: "10px" }}>
                  <b>Center Content</b>
                </div>
                <SectionContent
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
                />
              </div>
              <div>
                <div style={{ marginTop: "10px" }}>
                  <b>Right Content</b>
                </div>
                <SectionContent
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
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  type="dashed"
                  danger
                  style={{ width: "100%" }}
                  icon={<MinusCircleOutlined />}
                  onClick={() => props.removeSection(index)}
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
        onClick={props.addSection}
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
