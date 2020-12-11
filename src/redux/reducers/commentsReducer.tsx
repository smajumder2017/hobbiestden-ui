import { IReducerInitialState } from "../reducers";
import { IComment } from "../../models/CommentsModel";
import {CommentsActionsType,FETCH_COMMENTS_REQUEST,FETCH_COMMENTS_SUCCESS,FETCH_COMMENTS_FAILURE} from '../actions/commentsAction';
import { LOADING, SUCCESS, ERROR } from "../../utils/actionCreators";

interface IBlogsInitialState extends IReducerInitialState<IComment[]> {
  
}

const initalState: IBlogsInitialState = {
  asyncStatus: 'INIT',
  data: []
};

export function comments(state = initalState, action: CommentsActionsType): IBlogsInitialState {
  switch (action.type) {
  case FETCH_COMMENTS_REQUEST: {
    return {
      ...state,
      asyncStatus: LOADING
    }
  }
  case FETCH_COMMENTS_SUCCESS: {
    return {
      ...state,
      asyncStatus: SUCCESS,
      data: action.payload.res
    }
  }
  case FETCH_COMMENTS_FAILURE: {
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
