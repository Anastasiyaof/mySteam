export interface User {
  [key: string]: any;
  email: string;
  password?: string;
  returnSecureToken?: boolean;
  username?: string;
  id: string;
  age?: string;
  games?: string[];
  friends?: string[];
  invites?: string[];
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}
