import { ExtendableError, IErrorDetails } from "./extandable-error";

interface IAPIError {
  status: number;
  message: string;
  errors: IErrorDetails[];
}

class APIError extends ExtendableError {
  constructor({ status, message, errors }: IAPIError) {
    super(status, message, errors);
  }
}

export default APIError;
