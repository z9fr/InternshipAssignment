export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISuccessLogin {
  token: string;
  accountType: string;
}
