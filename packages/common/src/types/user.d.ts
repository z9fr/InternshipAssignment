export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  mobile: number;
  status: boolean;
  password: string;
  accountType: string;
}

export interface IJwtToken {
  id: string;
  email: string;
  accountType: string;
}
