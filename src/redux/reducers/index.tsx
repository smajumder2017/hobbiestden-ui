import { combineReducers } from "redux";
import { auth } from "./authReducer";
import { createBlog } from "./createBlogReducer";

import { ReducerMappedState } from "../../utils/actionCreators";

const reducers = {
  auth,
  createBlog
};

export interface IReducerInitialState<T, U = any> {
  asyncStatus: string;
  data: T | null;
  error?: U;
}

export type IHobbiestDenAppState = ReducerMappedState<typeof reducers>;

export default combineReducers<IHobbiestDenAppState>(reducers);
