export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
}

export interface IComment {
  commentId: string;
  body: string;
  likes?: number;
  blogId?: string;
  userId?: string;
  parentCommentId?: string | null;
  replyToId?: string | null;
  creator: IUser;
  replyTo?: IUser;
  replies?: IComment[];
  createdAt: string;
  updatedAt: string;
}

export interface ICommentInput {
  blogId: string;
  userId: string;
  body: string;
  parentCommentId: string | null;
  replyToId: string | null;
}