export interface IErrorDetails {
  field: string;
  location: string;
  messages: string[];
}

export interface IAPIError {
  status: number;
  message: string;
  errors: IErrorDetails[];
}
