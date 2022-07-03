import { ExtendableError } from "./extandable-error";
import { IErrorDetails } from "@surgeintern/common/types";

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
