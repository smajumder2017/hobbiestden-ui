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
} from "../actions/createBlogActions";
import { ICreateBlog, IBlogSections } from "../../models/CreateBlogModel";

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
        },
      },
    },
  },
];

const initialState: IReducerInitialState<ICreateBlog> = {
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
): IReducerInitialState<ICreateBlog> {
  switch (action.type) {
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
        if(action.payload.req.contentType === 'none') {
          state.data.sections[action.payload.req.sectionIndex].subSections[
            action.payload.req.subSection
          ].contentValue = ""
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
        contentMeta: { backgroundColor, borderColor, imageHeight, imageWidth },
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
