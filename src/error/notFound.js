import baseError from "./baseError.js";

class NotFoundError extends baseError {
  constructor(message = "Page not found") {
    super(message, 404);
  }
}

export default NotFoundError;