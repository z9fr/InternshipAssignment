export interface IUsersTableProps {
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    mobile: number;
    status: boolean;
    password: string;
    accountType: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  mobile: number;
  status: boolean;
  password: string;
  accountType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
