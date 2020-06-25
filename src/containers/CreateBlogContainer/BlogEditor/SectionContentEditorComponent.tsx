import React, { useState } from "react";
import { Button, Input, Card, Select } from "antd";
import { IContent } from "../../../models/CreateBlogModel";
import { TextEditor } from "./TextEditor";
import { FileUploader } from "./EditorImageUploader";
import parse from "html-react-parser";

interface ISectionContentProps extends IContent {
  handleContentTypeChange: (
    value: "none" | "text" | "image" | "video" | "code"
  ) => void;
  handleContentChange: (value: string) => void;
  handleBackgroundColorChange?: (value: string) => void;
  handleBorderColorChange?: (value: string) => void;
  handleImageUpload?: (file: File) => Promise<void>;
  handleAdjustImageSize?: (value: string) => void;
  handleCodeThemeChange?: (value: string) => void;
  handleCodeLanguageChange?: (value: string) => void;
  useSave?: ()=> void;
}

export const SectionContent: React.FC<ISectionContentProps> = (props) => {
  const [editorState, setEditorState] = useState(false);

  const handleEditorClose = () => setEditorState((prv) => !prv);

  const handleContentTypeChange = (
    value: "none" | "text" | "image" | "video" | "code"
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
      await props.handleImageUpload(file);
    }
    if(props.useSave){
      props.useSave();
    }
  };

  const handleCodeThemeChange = (value: string) => {
    if(props.handleCodeThemeChange) {
      props.handleCodeThemeChange(value);
    }
    if(props.useSave){
      props.useSave();
    }
  }

  const handleCodeLanguageChange = (value: string) => {
    if(props.handleCodeLanguageChange) {
      props.handleCodeLanguageChange(value);
    }
    if(props.useSave){
      props.useSave();
    }
  }

  const handleImageSizeAdjust = (value: string) => {
    if(props.handleAdjustImageSize) {
      props.handleAdjustImageSize(value);
    }
  }

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
                className="textContent"
                style={{
                  width: '100%',
                  height: "70px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
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
                  onBlur={()=> {props.useSave && props.useSave()}}
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
                  onBlur={()=> {props.useSave && props.useSave()}}
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
          {props.contentValue && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <img src={props.contentValue} alt="" className="contentImage" />
            </div>
          )}
          <div style={{ marginTop: "10px" }}>
            <FileUploader
              value={props.contentValue}
              handleUpload={(file) => handleImageUpload(file)}
              crop={false}
              buttonText="Upload Image"
            />
          </div>
          {props.contentValue && <div style={{ marginTop: "10px" }}>
              <Input
                  type="number"
                  addonBefore="Adjust Image Size"
                  value={props.contentMeta.imageWidth === null  ? '' : props.contentMeta.imageWidth}
                  placeholder="Size In Number"
                  style={{ width: "100%" }}
                  onChange={(e) => handleImageSizeAdjust(e.target.value)}
                  onBlur={()=> {props.useSave && props.useSave()}}
                />
          </div>}
        </>
      )}
      {props.contentType === "video" && (
        <div style={{ marginTop: "10px" }}>
          <Input
            addonBefore="Link"
            placeholder="Enter Youtube Link"
            value={props.contentValue}
            style={{ width: "100%" }}
            onChange={(e) => handleContentChange(e.target.value)}
            onBlur={()=> {props.useSave && props.useSave()}}
          />
        </div>
      )}
      {props.contentType === "code" && (
        <div style={{ marginTop: "10px" }}>
          <div>
            <Input.TextArea
              value={props.contentValue}
              placeholder="Paste Your Code Here"
              autoSize={{ minRows: 3, maxRows: 10 }}
              onChange={(e) => handleContentChange(e.target.value)}
              onBlur={()=> {props.useSave && props.useSave()}}
            />
          </div>
          <div style={{marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>Language</div>
            <Select
            value={props.contentMeta.codeLanguage}
            onChange={(value) => handleCodeLanguageChange(value)}
            >
              <Select.Option value="javascript">JavaScript</Select.Option>
              <Select.Option value="typescript">TypeScript</Select.Option>
              <Select.Option value="html">HTML</Select.Option>
              <Select.Option value="css">CSS</Select.Option>
              <Select.Option value="python">Python</Select.Option>
              <Select.Option value="java">Java</Select.Option>
              <Select.Option value="c++">C++</Select.Option>
              <Select.Option value="c">C</Select.Option>
            </Select>
            
          </div>
          <div style={{marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>Choose Theme</div>
            <Select
            defaultValue={props.contentMeta.codeTheme}
            onChange={(value) => handleCodeThemeChange(value)}
            >
              <Select.Option value="Docco">Docco</Select.Option>
              <Select.Option value="Atom One Dark">Atom One Dark</Select.Option>
              <Select.Option value="Atom One Light">Atom One Light</Select.Option>
            </Select>
            
          </div>
        </div>
      )}
      <TextEditor
        drwaerState={editorState}
        handleClose={handleEditorClose}
        onEditorChange={handleContentChange}
      />
    </div>
  );
};
