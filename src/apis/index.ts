import http from "../utils/http";
import {
  IAuthRequest,
  IAuthResponse,
  IFetchSession,
  ICreateUserRequest,
} from "../models/AuthModel";
import {
  IBlogResponse,
  ICreateBlog,
  ICreateBlogRequest,
} from "../models/CreateBlogModel";
import {IComment, ICommentInput} from '../models/CommentsModel';
import config from "../config";

export const register = (apiArgs: ICreateUserRequest) => {
  return http.post<ICreateUserRequest, IFetchSession>(
    `${config.backendServiceUrl}user`,
    apiArgs
  );
};

export const login = (apiArgs: IAuthRequest) => {
  return http.post<IAuthRequest, IAuthResponse>(
    `${config.backendServiceUrl}auth/login`,
    apiArgs
  );
};

export const facebookLogin = (apiArgs: {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}) => {
  return http.post<
    { email: string; firstName: string; lastName: string; image: string },
    IAuthResponse
  >(`${config.backendServiceUrl}auth/facebooklogin`, apiArgs);
};

export const fetchSession = () => {
  return http.get<{}, IFetchSession>(`${config.backendServiceUrl}auth/session`);
};

export const uploadImage = (args: FormData) => {
  return http.post<{}, { url: string }>(
    `${config.backendServiceUrl}image/upload`,
    args,
    {
      formData: args,
    }
  );
};

export const fetchBlogById = (args: { blogId: string }) => {
  return http.get<{}, IBlogResponse>(
    `${config.backendServiceUrl}blog/${args.blogId}`
  );
};

export const createBlog = (args: ICreateBlogRequest) => {
  return http.post<ICreateBlogRequest, IBlogResponse>(
    `${config.backendServiceUrl}blog`,
    args
  );
};

export const saveBlog = (args: {
  blogId: string;
  content: ICreateBlog;
  title: string;
}) => {
  return http.patch<{ blogId: string; content: ICreateBlog }, IBlogResponse>(
    `${config.backendServiceUrl}blog`,
    args
  );
};

export const fetchAllBlogsByUser = () => {
  return http.get<{}, IBlogResponse[]>(
    `${config.backendServiceUrl}blog/userBlogs`
  );
};

export const fetchBlogsByStatus = (args: { status: string }) => {
  return http.get<{}, IBlogResponse[]>(
    `${config.backendServiceUrl}blog/allBlogs`,
    { ...args }
  );
};

export const updateBlogStatus = (args: {
  blogId: string;
  status: "CREATED" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "NOT APPROVED";
}) => {
  return http.put<
    {
      blogId: string;
      status:
        | "CREATED"
        | "SUBMITTED"
        | "APPROVED"
        | "PUBLISHED"
        | "NOT APPROVED";
    },
    IBlogResponse
  >(`${config.backendServiceUrl}blog/status`, args);
};

export const fetchAllCategories = () => {
  return http.get<{}, Array<{ category: string; tags: string[] }>>(
    `${config.backendServiceUrl}category`
  );
};

export const fetchComments = (args: {blogId: string}) => {
  return http.get<{}, Array<IComment>>(
    `${config.backendServiceUrl}comments/${args.blogId}`
  );
}

export const createComment = (args: ICommentInput) => {
  return http.post<ICommentInput, IComment>(
    `${config.backendServiceUrl}comments/`, args
  );
}

export const updateComment = (args: {commentId: string; body: string}) => {
  return http.put<{commentId: string; body: string}, string>(
    `${config.backendServiceUrl}comments/`, args
  );
}

export const removeComment = (args: {commentId: string}) => {
  return http.delete<{commentId: string}, string>(
    `${config.backendServiceUrl}comments/`, args
  );
}
