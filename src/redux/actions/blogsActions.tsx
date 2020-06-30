import { GetActionTypes, createAsyncAction } from '../../utils/actionCreators';
import * as api from '../../apis';

export const FETCH_BLOGS_REQUEST = 'FETCH_BLOGS_REQUEST';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';

const BlogActions = {
  fetchBlogs: createAsyncAction([FETCH_BLOGS_REQUEST,FETCH_BLOGS_SUCCESS,FETCH_BLOGS_FAILURE], api.fetchBlogsByStatus),
};

export default BlogActions;
export type BlogActionsType = GetActionTypes<typeof BlogActions>;
