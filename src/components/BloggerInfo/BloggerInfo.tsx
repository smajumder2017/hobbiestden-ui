import React from "react";
import { Avatar, Button } from "antd";
import {
  TwitterOutlined,
  FacebookFilled,
  LinkedinFilled,
} from "@ant-design/icons";

import "./BloggerInfo.css";

interface IOwnProps {
  userName: string;
  blogDate: string;
  userImageUrl?: string;
}

export const BloggerInfo: React.FC<IOwnProps> = (props) => {
  return (
    <div className="infoContainer">
      <div className="bloggerInfo">
        <div>
          {props.userImageUrl ? (
            <Avatar size={80} src={props.userImageUrl} />
          ) : (
            <Avatar size={80}>
              {props.userName.split(" ")[0][0] +
                props.userName.split(" ")[1][0]}
            </Avatar>
          )}
        </div>
        <div className="bloggerInfoContainer">
          <div className="bloggerName">{props.userName}</div>
          <div className="date">{props.blogDate}</div>
        </div>
      </div>
      <div className="shareContainer">
        <Button
          icon={<FacebookFilled />}
          shape="circle-outline"
          type="text"
        ></Button>
        <Button
          icon={<TwitterOutlined />}
          shape="circle-outline"
          type="text"
        ></Button>
        <Button
          icon={<LinkedinFilled />}
          shape="circle-outline"
          type="text"
        ></Button>
      </div>
    </div>
  );
};
