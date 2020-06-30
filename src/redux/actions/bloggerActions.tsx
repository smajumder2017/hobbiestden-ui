import { GetActionTypes, createAsyncAction } from '../../utils/actionCreators';
import * as api from '../../apis';

export const CREATE_BLOG_REQUEST = 'CREATE_BLOG_REQUEST';
export const CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS';
export const CREATE_BLOG_FAILURE = 'CREATE_BLOG_FAILURE';

export const FETCH_BLOGS_BY_CREATOR_REQUEST = 'FETCH_BLOGS_BY_CREATOR_REQUEST';
export const FETCH_BLOGS_BY_CREATOR_SUCCESS = 'FETCH_BLOGS_BY_CREATOR_SUCCESS';
export const FETCH_BLOGS_BY_CREATOR_FAILURE = 'FETCH_BLOGS_BY_CREATOR_FAILURE';

export const FETCH_BLOGS_CATEGORY_REQUEST = 'FETCH_BLOGS_CATEGORY_REQUEST';
export const FETCH_BLOGS_CATEGORY_SUCCESS = 'FETCH_BLOGS_CATEGORY_SUCCESS';
export const FETCH_BLOGS_CATEGORY_FAILURE = 'FETCH_BLOGS_CATEGORY_FAILURE';

export const LOGOUT= 'LOGOUT';

const BloggerActions = {
  createBlog: createAsyncAction([CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, CREATE_BLOG_FAILURE], api.createBlog),
  fetchBlogs: createAsyncAction([FETCH_BLOGS_BY_CREATOR_REQUEST, FETCH_BLOGS_BY_CREATOR_SUCCESS, FETCH_BLOGS_BY_CREATOR_FAILURE], api.fetchAllBlogsByUser),
  fetchCategories: createAsyncAction([FETCH_BLOGS_CATEGORY_REQUEST,FETCH_BLOGS_CATEGORY_SUCCESS,FETCH_BLOGS_CATEGORY_FAILURE], api.fetchAllCategories)
};

export default BloggerActions;
export type BloggerActionsType = GetActionTypes<typeof BloggerActions>;
