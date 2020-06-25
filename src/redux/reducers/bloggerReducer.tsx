import { IReducerInitialState } from "../reducers";
import { IBlogResponse } from "../../models/CreateBlogModel";
import { BloggerActionsType, FETCH_BLOGS_BY_CREATOR_REQUEST, FETCH_BLOGS_BY_CREATOR_SUCCESS, FETCH_BLOGS_BY_CREATOR_FAILURE } from "../actions/bloggerActions";
import { LOADING, SUCCESS, ERROR } from "../../utils/actionCreators";

interface IBloggerInitialState extends IReducerInitialState<IBlogResponse[]> {
  
}

const initalState: IBloggerInitialState = {
  asyncStatus: 'INIT',
  data: []
};

export function blogger(state = initalState, action: BloggerActionsType): IBloggerInitialState {
  switch (action.type) {
  case FETCH_BLOGS_BY_CREATOR_REQUEST: {
    return {
      ...state,
      asyncStatus: LOADING
    }
  }
  case FETCH_BLOGS_BY_CREATOR_SUCCESS: {
    return {
      ...state,
      asyncStatus: SUCCESS,
      data: action.payload.res
    }
  }
  case FETCH_BLOGS_BY_CREATOR_FAILURE: {
    return {
      ...state,
      asyncStatus: ERROR,
    }
  }
    default: {
      return { ...state };
    }
  }
}
