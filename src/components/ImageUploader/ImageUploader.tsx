import React, { useRef, useState, useEffect } from "react";

import "./ImageUploader.css";
import { PlusOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface IOwnProps {
  placeholder?: string;
  handleImageUpload?: (file: File) => Promise<void>;
  value?: string;
}

const ImageUploader: React.FC<IOwnProps> = (props) => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (props.value) {
      setLoader(true);
    }
  }, [props.value]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (props.handleImageUpload) {
        props.handleImageUpload(e.target.files[0]);
      }
    }
  };
  return (
    <>
      <div
        className="imageUploadContainer"
        onClick={() => inputRef.current?.click()}
      >
        <div
          style={{
            display: loader ? "flex" : "none",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Spin />
        </div>
        <img
          className="contentImage"
          style={{ display: !props.value ? "none" : "block" }}
          src={props.value}
          alt="not avilable"
          onLoad={() => {
            setLoader(false);
          }}
        />
        {!props.value && (
          <>
            <PlusOutlined style={{ fontSize: "18px" }} />
            <div style={{ fontSize: "14px", marginTop: 10 }}>
              Add Blog Thumbnail
            </div>
          </>
        )}
      </div>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageSelect}
      />
    </>
  );
};

export default ImageUploader;
