export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
}

export interface IFetchSession {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  image?: string;
}

export interface ICreateUserRequest {email: string, firstName: string, lastName: string; password: string}