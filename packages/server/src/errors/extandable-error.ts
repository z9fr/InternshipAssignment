export interface IErrorConstructor {
  message: string;
  stack: string;
}

class ExtendableError extends Error {
  constructor({ message, stack }: IErrorConstructor) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

export default ExtendableError;
