import React from 'react';
import { Avatar, Button } from 'antd';
import {
  TwitterOutlined,
  FacebookFilled,
  LinkedinFilled,
} from "@ant-design/icons";

import './BloggerInfo.css';

interface IOwnProps {
  userName: string,
  blogDate: string,
  userImageUrl?: string
}

export const BloggerInfo: React.FC<IOwnProps> = (props) => {
  return (
    <div className="infoContainer">
      <div className="bloggerInfo">
        <div>
          <Avatar
            size={100}
            src={props.userImageUrl || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
          />
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