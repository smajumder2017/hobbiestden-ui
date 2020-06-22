/* eslint-env browser */
import { stringifyQueryParams } from './urlUtils';
import cookies from 'react-cookies';
export interface IHttp {
  get<T, U>(url: string, requestParams?: T, config?: Partial<IHTTPConfig>): Promise<U>;
  put<T, U>(url: string, data: T, config?: Partial<IHTTPConfig>): Promise<U>;
  post<T, U>(url: string, data: T, config?: Partial<IHTTPConfig>): Promise<U>;
  delete<T, U>(url: string, data: T, config?: Partial<IHTTPConfig>): Promise<U>;
  patch<T, U>(url: string, data: T, config?: Partial<IHTTPConfig>): Promise<U>;
}

// const defaultConfig = {
//   credentials: 'include' as RequestCredentials,
//   redirect: 'follow' as RequestRedirect
// };

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': '',
};

export interface IHTTPConfig {
  credentials: RequestCredentials;
  redirect: RequestRedirect;
  headers: { [key: string]: string };
  formData: FormData;
}

function request<T>(res: Response): Promise<T> {
  return Promise.resolve(res)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      const isContentTypeJson = contentType && contentType.indexOf('application/json') !== -1;
      if (response.ok) {
        if (isContentTypeJson) {
          return Promise.resolve(response.json());
        }
        return Promise.resolve(response.text());
      }
      if (isContentTypeJson) {
        return response
          .json()
          .then((error) => Promise.reject({ status: response.status, response: error }));
      }
      return response
        .text()
        .then((error) => Promise.reject({ status: response.status, response: error }));
    })
    .catch((error) => Promise.reject(error));
}

function fireRequest<T>(url: string, config: Partial<IHTTPConfig> = {}): Promise<T> {
  const conf = {
    ...config,
    headers: {
      ...defaultHeaders,
      ...config.headers
    }
  };

  if (conf.headers['Content-Type'] === undefined) {
    delete conf.headers['Content-Type'];
  }

  if(cookies.load('Authorization')){
    conf.headers.Authorization = 'bearer ' + cookies.load('Authorization')
  }

  if (conf.formData && conf.headers) delete conf.headers['Content-Type'];

  return fetch(url, conf)
    .then((res) => {
      // if (res.status === 401) {
      //   // figure out which app it is by reading the config
      //   // and redirect to the login URL
      //   const app = Object.keys(appConf).filter(
      //     appName => url.indexOf(appConf[appName].apiRoute) > -1,
      //   )[0];
      //   const newUrl = st(appConf, [app, 'loginUrl']);
      //   const isAuthenticated = st(appConf, [app, 'isAuthenticated']);
      //   if (isAuthenticated && newUrl) {
      //     window.location.replace(
      //       `${newUrl}?redirect_url=${window.location.href}`,
      //     );
      //   }
      // }
      return res;
    })
    .then<T>(request);
}

export default {
  get<T, U>(url: string, requestParams?: T, config: Partial<IHTTPConfig> = {}): Promise<U> {
    url += stringifyQueryParams(requestParams);
    return fireRequest<U>(
      url,
      Object.assign(
        {
          method: 'get'
        },
        config
      )
    );
  },
  put<T, U>(url: string, data: T, config: Partial<IHTTPConfig> = {}): Promise<U> {
    return fireRequest<U>(
      url,
      Object.assign(
        {
          method: 'put',
          body: JSON.stringify(data)
        },
        config
      )
    );
  },
  post<T, U>(url: string, data: T, config: Partial<IHTTPConfig> = {}): Promise<U> {
    return fireRequest<U>(
      url,
      Object.assign(
        {
          method: 'post',
          body: config.formData ? data : JSON.stringify(data)
        },
        config
      )
    );
  },
  delete<T, U>(url: string, data: T, config: Partial<IHTTPConfig> = {}): Promise<U> {
    return fireRequest<U>(
      url,
      Object.assign(
        {
          method: 'delete',
          body: JSON.stringify(data)
        },
        config
      )
    );
  },
  patch<T, U>(url: string, data: T, config: Partial<IHTTPConfig> = {}): Promise<U> {
    return fireRequest<U>(
      url,
      Object.assign(
        {
          method: 'PATCH',
          body: JSON.stringify(data)
        },
        config
      )
    );
  }
};
