import { GetActionTypes, createAsyncAction } from "../../utils/actionCreators";
import * as api from "../../apis";

export const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";

export const POST_COMMENT_REQUEST = "POST_COMMENT_REQUEST";
export const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS";
export const POST_COMMENT_FAILURE = "POST_COMMENT_FAILURE";

export const UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT_REQUEST";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

const CommentsActions = {
  fetchComments: createAsyncAction(
    [FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE],
    api.fetchComments
  ),
  postComment: createAsyncAction(
    [POST_COMMENT_REQUEST, POST_COMMENT_SUCCESS, POST_COMMENT_FAILURE],
    api.createComment
  ),
  editComment: createAsyncAction(
    [UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAILURE],
    api.updateComment
  ),
  deleteComment: createAsyncAction(
    [DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE],
    api.removeComment
  ),
};

export default CommentsActions;
export type CommentsActionsType = GetActionTypes<typeof CommentsActions>;
