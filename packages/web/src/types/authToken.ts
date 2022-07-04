export interface IAuthTokenStore {
  token: string;
  accountType: string;
  email: string;
}

export interface IDecodedToken {
  id: string;
  email: string;
  accountType: string;
  iat: number;
  exp: number;
}
