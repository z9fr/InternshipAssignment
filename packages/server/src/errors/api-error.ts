import ExtendableError, { IErrorConstructor } from "./extandable-error";

class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   */
  constructor({ message, stack }: IErrorConstructor) {
    super({
      message,
      stack,
    });
  }
}

export default APIError;
