import { IErrorDetails } from "@surgeintern/common/types";

export class ExtendableError extends Error {
  status = 400;
  errors: IErrorDetails[] = [];

  constructor(
    status: number,
    message: string,
    stack: string,
    errors: IErrorDetails[]
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.stack = stack;
  }
}
