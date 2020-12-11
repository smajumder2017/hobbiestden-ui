import { IReducerInitialState } from "../reducers";
import { IBlogResponse } from "../../models/CreateBlogModel";
import {
  BloggerActionsType,
  FETCH_BLOGS_BY_CREATOR_REQUEST,
  FETCH_BLOGS_BY_CREATOR_SUCCESS,
  FETCH_BLOGS_BY_CREATOR_FAILURE,
  UPDATE_BLOG_STATUS_REQUEST,
  UPDATE_BLOG_STATUS_SUCCESS,
  UPDATE_BLOG_STATUS_FAILURE
} from "../actions/bloggerActions";
import { LOADING, SUCCESS, ERROR } from "../../utils/actionCreators";

interface IBloggerInitialState extends IReducerInitialState<IBlogResponse[]> {}

const initalState: IBloggerInitialState = {
  asyncStatus: "INIT",
  data: [],
};

export function blogger(
  state = initalState,
  action: BloggerActionsType
): IBloggerInitialState {
  switch (action.type) {
    case FETCH_BLOGS_BY_CREATOR_REQUEST: {
      return {
        ...state,
        asyncStatus: LOADING,
      };
    }
    case FETCH_BLOGS_BY_CREATOR_SUCCESS: {
      return {
        ...state,
        asyncStatus: SUCCESS,
        data: action.payload.res,
      };
    }
    case FETCH_BLOGS_BY_CREATOR_FAILURE: {
      return {
        ...state,
        asyncStatus: ERROR,
      };
    }
    case UPDATE_BLOG_STATUS_REQUEST: {
      return {
        ...state,
        asyncStatus: LOADING,
      };
    }
    case UPDATE_BLOG_STATUS_SUCCESS: {
      if(state.data) {
        const index = state.data.findIndex(blog => blog.blogId === action.payload.res.blogId);
        state.data[index] = action.payload.res;
        return {
          ...state,
          asyncStatus: SUCCESS,
          data: state.data
        }
      }
      return {
        ...state,
        asyncStatus: SUCCESS,
      };
    }
    case UPDATE_BLOG_STATUS_FAILURE: {
      return {
        ...state,
        asyncStatus: ERROR,
      };
    }
    default: {
      return { ...state };
    }
  }
}
