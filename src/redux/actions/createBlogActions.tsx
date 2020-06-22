import { GetActionTypes, createAction } from "../../utils/actionCreators";
import { IContentMeta } from "../../models/CreateBlogModel";
// import * as api from '../../apis';

export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_SUBTITLE = "UPDATE_SUBTITLE";
export const UPDATE_SECTION_HEADING = "UPDATE_SECTION_HEADING";
export const UPDATE_SECTION = "UPDATE_SECTION";
export const UPDATE_SECTION_CONTENT = "UPDATE_SECTION_CONTENT";
export const UPDATE_CONTENT_META = "UPDATE_CONTENT_META";
export const ADD_SECTION = "ADD_SECTION";
export const REMOVE_SECTION = "REMOVE_SECTION";
export const UPDATE_COVERIMAGE = 'UPDATE_COVERIMAGE';
export const UPDATE_TEMP_COVERIMAGE = 'UPDATE_TEMP_COVERIMAGE';
export const UPDATE_SECTION_CONTENT_IMAGE = 'UPDATE_SECTION_CONTENT_IMAGE';

const CreateBlogActions = {
  addSection: () => createAction(ADD_SECTION, {}, {}),

  updateTitle: (title: string) => createAction(UPDATE_TITLE, { title }, {}),

  updateSubtitle: (subtitle: string) =>
    createAction(UPDATE_SUBTITLE, { subtitle }, {}),

  updateCoverImage: (url: string) => createAction(UPDATE_COVERIMAGE, {url}, {}),

  updateTempCoverImage: (url: string) => createAction(UPDATE_TEMP_COVERIMAGE, {url}, {}),

  updateSectionHeading: (args: { heading: string; sectionIndex: number }) =>
    createAction(UPDATE_SECTION_HEADING, args, {}),

  updateContentType: (args: {
    sectionIndex: number;
    subSection: "left" | "right" | "center";
    contentType: "none" | "text" | "image" | "video";
  }) => createAction(UPDATE_SECTION, args, {}),

  updateContent: (args: {
    sectionIndex: number;
    subSection: "left" | "right" | "center";
    content: string;
  }) => createAction(UPDATE_SECTION_CONTENT, args, {}),

  updateContentImage: (args: {
    sectionIndex: number;
    subSection: "left" | "right" | "center";
    content: string;
  }) => createAction(UPDATE_SECTION_CONTENT_IMAGE, args, {}),

  updateContentMeta: (
    args: {contentMeta: IContentMeta,  sectionIndex: number,
      subSection: "left" | "right" | "center"}
  ) =>
    createAction(
      UPDATE_CONTENT_META,
      args,
      {}
    ),

    removeSection : (sectionIndex: number) => createAction(REMOVE_SECTION, {sectionIndex}, {})
};

export default CreateBlogActions;
export type CreateBlogActionsType = GetActionTypes<typeof CreateBlogActions>;
