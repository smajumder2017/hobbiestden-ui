import http from '../utils/http';
import {IAuthRequest, IAuthResponse, IFetchSession} from '../models/AuthModel';
import config from '../config';

export const login = (apiArgs: IAuthRequest) => {
  return http.post<IAuthRequest, IAuthResponse>(`${config.backendServiceUrl}auth/login`, apiArgs);
};

export const fetchSession = () => {
  return http.get<{}, IFetchSession>(`${config.backendServiceUrl}auth/session`);
}

export const uploadImage = (args: FormData) => {
  return http.post<{}, {url: string}>(`${config.backendServiceUrl}image/upload`, args, {
    formData: args
  });
}