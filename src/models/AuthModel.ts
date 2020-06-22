export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
}

export interface IFetchSession {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
