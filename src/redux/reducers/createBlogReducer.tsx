import { IReducerInitialState } from "../reducers";
import {
  CreateBlogActionsType,
  UPDATE_SECTION,
  ADD_SECTION,
  UPDATE_TITLE,
  UPDATE_SUBTITLE,
  UPDATE_SECTION_CONTENT,
  UPDATE_SECTION_HEADING,
  UPDATE_CONTENT_META,
  REMOVE_SECTION,
  UPDATE_COVERIMAGE,
  UPDATE_TEMP_COVERIMAGE,
  UPDATE_SECTION_CONTENT_IMAGE,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_BLOG_FAILURE,
  SAVE_BLOG_REQUEST,
  SAVE_BLOG_SUCCESS,
  SAVE_BLOG_FAILURE,
} from "../actions/createBlogActions";
import { ICreateBlog, IBlogSections } from "../../models/CreateBlogModel";
import { LOADING, SUCCESS, ERROR } from "../../utils/actionCreators";

const getInitialSection = (): IBlogSections[] => [
  {
    header: "",
    subSections: {
      left: {
        contentType: "text",
        contentValue: "",
        contentMeta: {
          backgroundColor: null,
          borderColor: null,
          imageHeight: null,
          imageWidth: null,
          codeTheme: "Docco",
          codeLanguage: "javascript",
        },
      },
      center: {
        contentType: "text",
        contentValue: "",
        contentMeta: {
          backgroundColor: null,
          borderColor: null,
          imageHeight: null,
          imageWidth: null,
          codeTheme: "Docco",
          codeLanguage: "javascript",
        },
      },
      right: {
        contentType: "text",
        contentValue: "",
        contentMeta: {
          backgroundColor: null,
          borderColor: null,
          imageHeight: null,
          imageWidth: null,
          codeTheme: "Docco",
          codeLanguage: "javascript",
        },
      },
    },
  },
];

interface ICreateBlogReducerInitialState
  extends IReducerInitialState<ICreateBlog> {
  blogId?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: "CREATED" | "SUBMITTED" | "APPROVED" | "NOT APPROVED";
}

const initialState: ICreateBlogReducerInitialState = {
  asyncStatus: "INIT",
  data: {
    title: "",
    subTitle: "",
    coverImageUrl: "",
    tempCoverImage: "",
    tags: [],
    sections: getInitialSection(),
  },
};

export function createBlog(
  state = { ...initialState },
  action: CreateBlogActionsType
): ICreateBlogReducerInitialState {
  switch (action.type) {
    case FETCH_BLOG_REQUEST: {
      return {
        ...state,
        asyncStatus: LOADING,
      };
    }
    case FETCH_BLOG_SUCCESS: {
      state.data = action.payload.res.content;
      return {
        ...state,
        asyncStatus: SUCCESS,
      };
    }
    case FETCH_BLOG_FAILURE: {
      return {
        ...state,
        asyncStatus: ERROR,
      };
    }
    case SAVE_BLOG_REQUEST: {
      return {
        ...state,
        asyncStatus: LOADING,
      };
    }
    case SAVE_BLOG_SUCCESS: {
      if (state.data) {
        state.blogId = action.payload.res.blogId;
        state.createdAt = action.payload.res.createdAt;
        state.updatedAt = action.payload.res.updatedAt;
        state.status = action.payload.res.status;
      }

      return {
        ...state,
        asyncStatus: SUCCESS,
      };
    }
    case SAVE_BLOG_FAILURE: {
      return {
        ...state,
        asyncStatus: ERROR,
      };
    }
    case UPDATE_TITLE: {
      if (state.data) {
        state.data.title = action.payload.req.title;
      }
      return {
        ...state,
      };
    }
    case UPDATE_SUBTITLE: {
      if (state.data) {
        state.data.subTitle = action.payload.req.subtitle;
      }
      return {
        ...state,
      };
    }
    case UPDATE_COVERIMAGE: {
      if (state.data) {
        state.data.coverImageUrl = action.payload.req.url;
      }
      return {
        ...state,
      };
    }
    case UPDATE_TEMP_COVERIMAGE: {
      if (state.data) {
        state.data.tempCoverImage = action.payload.req.url;
      }
      return {
        ...state,
      };
    }
    case ADD_SECTION: {
      const emptySection = getInitialSection()[0];
      if (state.data) {
        const data = { ...state.data };
        const sections = [...data.sections];
        sections.push(emptySection);
        return {
          ...state,
          data: {
            ...state.data,
            sections: [...sections],
          },
        };
      }
      return {
        ...state,
      };
    }
    case REMOVE_SECTION: {
      if (state.data) {
        state.data.sections.splice(action.payload.req.sectionIndex, 1);
      }

      return {
        ...state,
      };
    }
    case UPDATE_SECTION_HEADING: {
      if (state.data) {
        state.data.sections[action.payload.req.sectionIndex].header =
          action.payload.req.heading;
      }
      return {
        ...state,
      };
    }
    case UPDATE_SECTION: {
      if (state.data) {
        state.data.sections[action.payload.req.sectionIndex].subSections[
          action.payload.req.subSection
        ].contentType = action.payload.req.contentType;
        if (action.payload.req.contentType === "none") {
          state.data.sections[action.payload.req.sectionIndex].subSections[
            action.payload.req.subSection
          ].contentValue = "";
        }
      }
      return {
        ...state,
      };
    }
    case UPDATE_SECTION_CONTENT: {
      if (state.data) {
        state.data.sections[action.payload.req.sectionIndex].subSections[
          action.payload.req.subSection
        ].contentValue = action.payload.req.content;
      }
      return {
        ...state,
      };
    }
    case UPDATE_SECTION_CONTENT_IMAGE: {
      if (state.data) {
        state.data.sections[action.payload.req.sectionIndex].subSections[
          action.payload.req.subSection
        ].contentValue = action.payload.req.content;
      }
      return {
        ...state,
      };
    }
    case UPDATE_CONTENT_META: {
      const {
        contentMeta: {
          backgroundColor,
          borderColor,
          imageHeight,
          imageWidth,
          codeTheme,
          codeLanguage,
        },
        sectionIndex,
        subSection,
      } = action.payload.req;
      if (state.data) {
        if (backgroundColor) {
          state.data.sections[sectionIndex].subSections[
            subSection
          ].contentMeta.backgroundColor = backgroundColor;
        }
        if (borderColor) {
          state.data.sections[sectionIndex].subSections[
            subSection
          ].contentMeta.borderColor = borderColor;
        }
        if (imageHeight) {
          state.data.sections[sectionIndex].subSections[
            subSection
          ].contentMeta.imageHeight = imageHeight;
        }
        if (imageWidth) {
          state.data.sections[sectionIndex].subSections[
            subSection
          ].contentMeta.imageWidth = imageWidth;
        }
        if (codeTheme) {
          state.data.sections[sectionIndex].subSections[
            subSection
          ].contentMeta.codeTheme = codeTheme;
        }
        if (codeLanguage) {
          state.data.sections[sectionIndex].subSections[
            subSection
          ].contentMeta.codeLanguage = codeLanguage;
        }
      }
      return {
        ...state,
      };
    }
    default: {
      return { ...state };
    }
  }
}
