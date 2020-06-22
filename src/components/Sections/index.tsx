import React from "react";
import { IBlogSections, IContent } from "../../models/CreateBlogModel";
import parse from "html-react-parser";

import "./Sections.css";
import ReactPlayer from "react-player";

interface IContentOwnProps {
  className: string;
  content: IContent;
  style: {[key: string]: { backgroundColor?: string; border?: string; flex: number };}
}

export const SectionContents: React.FC<IContentOwnProps> = (props) => {
  console.log(props.style);
  if (props.content.contentType === "text") {
    return (
      <div className={props.className} style={props.style['text']}>
        {parse(props.content.contentValue)}
      </div>
    );
  }
  if (props.content.contentType === "image") {
    return (
      <div className={props.className} style={props.style['image']}>
        <img
          src={props.content.contentValue}
          style={{ width: "100%", objectFit: "contain" }}
          alt=""
        />
      </div>
    );
  }
  if (props.content.contentType === "video") {
    return (
      <div className={props.className} style={props.style['video']}>
        <ReactPlayer width="100%" url={props.content.contentValue} />
      </div>
    );
  }
  return null;
};

interface ISectionOwnProps {
  sections: IBlogSections[];
}

export const Sections: React.FC<ISectionOwnProps> = (props) => {
  return (
    <div className="sections-container">
      {props.sections.map((section, index) => {
        const getBackgoundColor = (side: string): string => {
          return (
            section.subSections[side].contentMeta.backgroundColor || "#FFF"
          );
        };
        const getBorderColor = (side: string): string => {
          return (
            "1px solid " + section.subSections[side].contentMeta.borderColor ||
            "#FFF"
          );
        };
        const left = section.subSections.left.contentType !== "none";
        const center = section.subSections.center.contentType !== "none";
        const right = section.subSections.right.contentType !== "none";
        const contentMap: { [key: string]: number } = {
          left: 1,
          center: 1,
          right: 1,
        };
        if (left && center && !right) {
          contentMap.left = 1;
          contentMap.center = 2;
        } else if (!left && center && right) {
          contentMap.right = 1;
          contentMap.center = 2;
        } else if (left && center && right) {
          contentMap.left = 1;
          contentMap.right = 1;
          contentMap.center = 1;
        } else {
          contentMap.center = 1;
        }

        const getContentPresence = (side: string): number => {
          return contentMap[side];
        };

        return (
          <div className="section" key={index}>
            <div className="section-header">{section.header}</div>
            <div className="section-content">
              {Object.keys(section.subSections).map((seckey: string, index) => {
                const styles: {[key: string]: { backgroundColor?: string; border?: string; flex: number };} = {
                  text: {
                    backgroundColor: getBackgoundColor(seckey),
                    border: getBorderColor(seckey),
                    flex: getContentPresence(seckey),
                  },
                  image: { flex: getContentPresence(seckey) },
                  video: { flex: getContentPresence(seckey) },
                };
                return (
                  <SectionContents
                    key={index}
                    content={section.subSections[seckey]}
                    className={seckey}
                    style={styles}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
