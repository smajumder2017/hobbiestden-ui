import { combineReducers } from "redux";
import { auth } from "./authReducer";
import { createBlog } from "./createBlogReducer";
import {blogger} from './bloggerReducer';
import {blogs} from './blogsReducer';

import { ReducerMappedState } from "../../utils/actionCreators";

const reducers = {
  auth,
  createBlog,
  blogger,
  blogs
};

export interface IReducerInitialState<T, U = any> {
  asyncStatus: string;
  data: T | null;
  error?: U;
}

export type IHobbiestDenAppState = ReducerMappedState<typeof reducers>;

export default combineReducers<IHobbiestDenAppState>(reducers);
