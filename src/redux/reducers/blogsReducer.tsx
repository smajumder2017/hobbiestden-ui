import { IReducerInitialState } from "../reducers";
import { IBlogResponse } from "../../models/CreateBlogModel";
import {BlogActionsType,FETCH_BLOGS_REQUEST,FETCH_BLOGS_SUCCESS,FETCH_BLOGS_FAILURE} from '../actions/blogsActions';
import { LOADING, SUCCESS, ERROR } from "../../utils/actionCreators";

interface IBlogsInitialState extends IReducerInitialState<IBlogResponse[]> {
  
}

const initalState: IBlogsInitialState = {
  asyncStatus: 'INIT',
  data: []
};

export function blogs(state = initalState, action: BlogActionsType): IBlogsInitialState {
  switch (action.type) {
  case FETCH_BLOGS_REQUEST: {
    return {
      ...state,
      asyncStatus: LOADING
    }
  }
  case FETCH_BLOGS_SUCCESS: {
    return {
      ...state,
      asyncStatus: SUCCESS,
      data: action.payload.res
    }
  }
  case FETCH_BLOGS_FAILURE: {
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
