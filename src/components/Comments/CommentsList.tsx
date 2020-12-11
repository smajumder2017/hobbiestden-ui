import React, { useEffect, useState } from "react";
import { Comment, Avatar } from "antd";
import { bindActionCreators, Dispatch } from "redux";
import { IHobbiestDenAppState } from "../../redux/reducers";
import CommentsAction from "../../redux/actions/commentsAction";
import { connect } from "react-redux";
import { GetConnectDispatchPropsType } from "../../utils/actionCreators";
import { Editor } from "./CommentEditor";
const prettyDate = require("pretty-date");

interface IOwnProps {
  blogId: string;
}

type TStateProps = ReturnType<typeof mapStateToProps>;
type TBindActionCreator = typeof CommentsAction;
type TDispatchProps = GetConnectDispatchPropsType<TBindActionCreator>;

type TAllProps = IOwnProps & TStateProps & TDispatchProps;

const CommentsList: React.FC<TAllProps> = (props) => {
  const [text, setText] = useState("");
  const [replyForCommentId, setreplyForCommentId] = useState("");
  const [replyText, setReplyText] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const fetchAllComments = async () => {
    try {
      await props.fetchComments({ blogId: props.blogId });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.blogId) {
      fetchAllComments();
    }
  }, [props.blogId]);

  const submitComment = async () => {
    try {
      const payload = {
        blogId: props.blogId,
        userId: props.auth.data?.userId || "",
        body: text,
        parentCommentId: null,
        replyToId: null,
      };
      await props.postComment(payload);
      setText("");
      fetchAllComments();
    } catch (error) {
      console.log(error);
    }
  };

  const submitReply = async (parentCommentId: string, replyTo: string) => {
    try {
      const payload = {
        blogId: props.blogId,
        userId: props.auth.data?.userId || "",
        body: replyText,
        parentCommentId: parentCommentId,
        replyToId: replyTo !== props.auth.data?.userId ? replyTo : null,
      };
      await props.postComment(payload);
      setreplyForCommentId("");
      setReplyText("");
      fetchAllComments();
    } catch (error) {
      console.log(error);
    }
  };

  const updateComment = async (commentId: string) => {
    try {
      const payload = { commentId, body: replyText };
      await props.editComment(payload);
      setreplyForCommentId("");
      setReplyText("");
      setIsEdit(false);
      fetchAllComments();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const payload = { commentId };
      await props.deleteComment(payload);
      fetchAllComments();
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (commentId: string, body: string) => {
    setIsEdit(true);
    setreplyForCommentId(commentId);
    setReplyText(body);
  };

  const handleDelete = (commentId: string) => {
    deleteComment(commentId);
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Comments</h2>
      <Editor
        onChange={(t) => setText(t)}
        onSubmit={submitComment}
        value={text}
        placeholder={"Add a Comment..."}
      />
      {props.comments.data &&
        props.comments.data.map((comment) => {
          return (
            <Comment
              key={comment.commentId}
              actions={[
                <span>{prettyDate.format(new Date(comment.updatedAt))}</span>,
                <span
                  key="comment-nested-reply-to"
                  onClick={() => setreplyForCommentId(comment.commentId)}
                >
                  Reply
                </span>,
                <span
                  onClick={() => handleEdit(comment.commentId, comment.body)}
                  key="comment-nested-edit"
                >
                  {comment.creator.userId === props.auth.data?.userId
                    ? "Edit"
                    : ""}
                </span>,
                <span key="comment-nested-delete" onClick={()=>{handleDelete(comment.commentId)}}>
                  {comment.creator.userId === props.auth.data?.userId
                    ? "Delete"
                    : ""}
                </span>,
              ]}
              author={
                <a>
                  {comment.creator?.firstName + " " + comment.creator?.lastName}
                </a>
              }
              avatar={<Avatar src={comment.creator?.image} alt="Han Solo" />}
              content={
                <div>
                  <div style={{ marginBottom: "5px" }}>
                    {comment.replyTo?.userId && (
                      <span>
                        <a>
                          {comment.replyTo.firstName +
                            " " +
                            comment.replyTo.lastName}
                        </a>
                      </span>
                    )}
                    <span>{" " + comment.body}</span>
                  </div>

                  {replyForCommentId === comment.commentId && (
                    <Editor
                      onChange={(t) => setReplyText(t)}
                      submitText={isEdit ? "Update" : "Reply"}
                      onSubmit={() =>
                        isEdit
                          ? updateComment(comment.commentId)
                          : submitReply(
                              comment.commentId,
                              comment.creator.userId
                            )
                      }
                      value={replyText}
                      onCancel={() => setreplyForCommentId("")}
                      placeholder={"Type your reply..."}
                    />
                  )}
                </div>
              }
            >
              {comment.replies &&
                comment.replies.map((cmnt) => {
                  return (
                    <Comment
                      key={cmnt.commentId}
                      actions={[
                        <span>
                          {prettyDate.format(new Date(cmnt.updatedAt))}
                        </span>,
                        <span
                          key="comment-nested-reply-to"
                          onClick={() => setreplyForCommentId(cmnt.commentId)}
                        >
                          Reply
                        </span>,
                        <span
                          onClick={() => handleEdit(cmnt.commentId, cmnt.body)}
                          key="comment-nested-edit"
                        >
                          {cmnt.creator.userId === props.auth.data?.userId
                            ? "Edit"
                            : ""}
                        </span>,
                        // <span key="comment-nested-edit" >{cmnt.creator.userId === props.auth.data?.userId ? 'Edit' : ''}</span>,
                        <span key="comment-nested-delete" onClick={()=>{handleDelete(cmnt.commentId)}}>
                          {cmnt.creator.userId === props.auth.data?.userId
                            ? "Delete"
                            : ""}
                        </span>,
                      ]}
                      author={
                        <a>
                          {cmnt.creator?.firstName +
                            " " +
                            cmnt.creator?.lastName}
                        </a>
                      }
                      avatar={
                        <Avatar src={cmnt.creator?.image} alt="Han Solo" />
                      }
                      content={
                        <div>
                          <div style={{ marginBottom: "5px" }}>
                            {cmnt.replyTo?.userId && (
                              <span>
                                <a>
                                  {cmnt.replyTo.firstName +
                                    " " +
                                    cmnt.replyTo.lastName}
                                </a>
                              </span>
                            )}
                            <span>{" " + cmnt.body}</span>
                          </div>

                          {replyForCommentId === cmnt.commentId && (
                            <Editor
                              onChange={(t) => setReplyText(t)}
                              onSubmit={() =>
                                isEdit
                                  ? updateComment(comment.commentId)
                                  : submitReply(
                                      comment.commentId,
                                      cmnt.creator.userId
                                    )
                              }
                              submitText={isEdit ? "Update" : "Reply"}
                              onCancel={() => setreplyForCommentId("")}
                              value={replyText}
                              placeholder={"Type your reply..."}
                            />
                          )}
                        </div>
                      }
                    ></Comment>
                  );
                })}
            </Comment>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state: IHobbiestDenAppState) => {
  return {
    auth: state.auth,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<TBindActionCreator, TDispatchProps>(
    CommentsAction,
    dispatch
  );

export default connect<TStateProps, TDispatchProps, {}, IHobbiestDenAppState>(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList);
