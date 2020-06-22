
import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  Select
} from "antd";
import { IContent } from "../../../models/CreateBlogModel";
import { TextEditor } from "./TextEditor";
import { FileUploader } from "./ImageUploader";
import parse from "html-react-parser";

interface ISectionContentProps extends IContent {
  handleContentTypeChange: (value: "none" | "text" | "image" | "video") => void;
  handleContentChange: (value: string) => void;
  handleBackgroundColorChange?: (value: string) => void;
  handleBorderColorChange?: (value: string) => void;
  handleImageUpload?: (file: File) => Promise<void>;
}

export const SectionContent: React.FC<ISectionContentProps> = (props) => {
  const [editorState, setEditorState] = useState(false);

  const handleEditorClose = () => setEditorState((prv) => !prv);

  const handleContentTypeChange = (
    value: "none" | "text" | "image" | "video"
  ) => {
    props.handleContentTypeChange(value);
  };

  const handleContentChange = (value: string) => {
    props.handleContentChange(value);
  };

  const handleBackgroundColorChange = (value: string) => {
    if (props.handleBackgroundColorChange) {
      props.handleBackgroundColorChange(value);
    }
  };

  const handleBorderColorChange = (value: string) => {
    if (props.handleBorderColorChange) {
      props.handleBorderColorChange(value);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (props.handleImageUpload) {
      props.handleImageUpload(file);
    }
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Content Type</div>
        <Select
          defaultValue={props.contentType}
          onChange={(value) => handleContentTypeChange(value)}
        >
          <Select.Option value="none">None</Select.Option>
          <Select.Option value="text">Text</Select.Option>
          <Select.Option value="image">Image</Select.Option>
          <Select.Option value="video">Video</Select.Option>
          <Select.Option value="code">Code</Select.Option>
        </Select>
      </div>
      {props.contentType === "text" && props.contentValue && (
        <>
          <div style={{ marginTop: "10px" }}>
            <Card style={{ width: "100%" }}>
              <div
                style={{
                  height: "70px",
                  whiteSpace: "nowrap",
                  overflowY: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {parse(props.contentValue)}
              </div>
            </Card>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <div style={{ flex: 1 }}>
                <Input
                  addonBefore="Background Color"
                  placeholder="#Hex Code"
                  style={{ width: "100%" }}
                  onChange={(e) => handleBackgroundColorChange(e.target.value)}
                />
              </div>
              <div
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  backgroundColor: props.contentMeta.backgroundColor || "#FFF",
                  marginLeft: "5px",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <div style={{ flex: 1 }}>
                <Input
                  addonBefore="Border Color"
                  placeholder="#Hex Code"
                  style={{ width: "100%" }}
                  onChange={(e) => handleBorderColorChange(e.target.value)}
                />
              </div>
              <div
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  backgroundColor: props.contentMeta.borderColor || "#FFF",
                  marginLeft: "5px",
                }}
              ></div>
            </div>
          </div>
        </>
      )}
      {props.contentType === "text" && (
        <div style={{ marginTop: "10px" }}>
          <Button
            type="dashed"
            style={{ width: "100%" }}
            onClick={handleEditorClose}
          >
            Open Editor
          </Button>
        </div>
      )}
      {props.contentType === "image" && (
        <>
          {props.contentValue && <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <img src={props.contentValue} alt="" className="contentImage" />
          </div>}
          <div style={{ marginTop: "10px" }}>
            <FileUploader
              value={props.contentValue}
              handleUpload={(file) => handleImageUpload(file)}
              crop={false}
              buttonText="Upload Image"
            />
          </div>
        </>
      )}
      {
        props.contentType === "video" && (
          <>
          <Input
                  addonBefore="Link"
                  placeholder="Enter Youtube Link"
                  style={{ width: "100%" }}
                  onChange={(e) => handleContentChange(e.target.value)}
                />
          </>
        )
      }

      <TextEditor
        drwaerState={editorState}
        handleClose={handleEditorClose}
        onEditorChange={handleContentChange}
      />
    </div>
  );
};