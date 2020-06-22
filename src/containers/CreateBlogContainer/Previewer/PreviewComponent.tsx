import React from "react";
import { IHobbiestDenAppState } from "../../../redux/reducers";
import CreateBlogActions from "../../../redux/actions/createBlogActions";
import { GetConnectDispatchPropsType } from "../../../utils/actionCreators";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Sections } from "../../../components/Sections";
import { BloggerInfo } from "../../../components/BloggerInfo/BloggerInfo";

import "./PreviewComponent.css";

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreators = typeof CreateBlogActions;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreators>;

type TAllProps = TStateProps & TDispatchProps;

export const PreviewComponent: React.FC<TAllProps> = (props) => {
  const userName =
    props.auth.data?.firstName && props.auth.data?.lastName
      ? props.auth.data?.firstName + " " + props.auth.data?.lastName
      : "";
  return (
    <div className="preview-container">
      {props.createBlog.data?.coverImageUrl && (
        <>
          <div>
            <img
              src={props.createBlog.data?.coverImageUrl}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <BloggerInfo userName={userName} blogDate="10th June, 2020" />
        </>
      )}

      <div className="title">{props.createBlog.data?.title}</div>
      <div className="subtitle">{props.createBlog.data?.subTitle}</div>
      {!props.createBlog.data?.coverImageUrl && (
        <BloggerInfo userName={userName} blogDate="10th June, 2020" />
      )}
      {props.createBlog.data?.sections && (
        <Sections sections={props.createBlog.data?.sections} />
      )}

      {/* <div className="sections-container">
        {props.createBlog.data?.sections.map((section, index) => {
          const getBackgoundColor = (side: string): string => {
            return (
              section.subSections[side].contentMeta.backgroundColor || "#FFF"
            );
          };
          const getBorderColor = (side: string): string => {
            return (
              "1px solid " +
                section.subSections[side].contentMeta.borderColor || "#FFF"
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
                {Object.keys(section.subSections).map(
                  (seckey: string, index) => {
                    if (section.subSections[seckey].contentType === "text") {
                      return (
                        <div
                          key={index}
                          className={seckey}
                          style={{
                            backgroundColor: getBackgoundColor(seckey),
                            border: getBorderColor(seckey),
                            flex: getContentPresence(seckey),
                          }}
                        >
                          {parse(section.subSections[seckey].contentValue)}
                        </div>
                      );
                    }
                    if (section.subSections[seckey].contentType === "image") {
                      return (
                        <div
                          className={seckey}
                          key={index}
                          style={{ flex: getContentPresence(seckey) }}
                        >
                          <img
                            src={section.subSections[seckey].contentValue}
                            style={{ width: "100%", objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                      );
                    }
                    if (section.subSections[seckey].contentType === "video") {
                      return (
                        <div
                          className={seckey}
                          key={index}
                          style={{ flex: getContentPresence(seckey) }}
                        >
                          <ReactPlayer
                            width="100%"
                            url={section.subSections[seckey].contentValue}
                          />
                        </div>
                      );
                    }
                    return null;
                  }
                )}
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

const mapStateToProps = (state: IHobbiestDenAppState) => {
  return {
    auth: state.auth,
    createBlog: state.createBlog,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreators, TDispatchProps>(
    CreateBlogActions,
    dispatch
  );

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(PreviewComponent);
