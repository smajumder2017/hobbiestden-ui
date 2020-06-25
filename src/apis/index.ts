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

export const saveBlog = (args: { blogId: string; content: ICreateBlog }) => {
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
