import React, { useState } from "react";
import { Button, Spin } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import CSS from 'csstype';

interface IOwProps {
  handleRemoveImage?: () => void;
  src: string;
  style?: CSS.Properties;
}

const ImageViewer: React.FC<IOwProps> = (props) => {
  const [loader, setLoader] = useState(true);

  return (
    <div style={{ marginBottom: "10px", position: "relative", display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: loader ? "flex" : "none",
          flex: 1,
          justifyContent: "center",
          position: 'absolute',
          left: 'calc(50% - 10px)',
          top: 'calc(50% - 10px)'
        }}
      >
        <Spin />
      </div>

      {props.handleRemoveImage && (
        <Button
          danger
          type="dashed"
          onClick={props.handleRemoveImage}
          icon={<CloseCircleFilled />}
          style={{ position: "absolute", right: 0 }}
        ></Button>
      )}
      <img
        style={props.style ? {...props.style} : { width: "100%", height: "auto" }}
        src={props.src}
        alt="not avilable"
        onLoad={() => {
          setLoader(false);
        }}
      />
    </div>
  );
};

export default ImageViewer;
