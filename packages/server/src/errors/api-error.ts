import { ExtendableError } from "./extandable-error";
import { IErrorDetails, IAPIError } from "@surgeintern/common/types";

class APIError extends ExtendableError {
  constructor({ status, message, errors, stack }: IAPIError) {
    super(status, message, stack, errors);
  }
}

export default APIError;
