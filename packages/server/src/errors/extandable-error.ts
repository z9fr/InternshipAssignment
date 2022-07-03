import { IErrorDetails } from "@surgeintern/common/types";

export class ExtendableError extends Error {
  status = 400;
  errors: IErrorDetails[] = [];

  constructor(status: number, message: string, errors: IErrorDetails[]) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.errors = errors;
  }
}
