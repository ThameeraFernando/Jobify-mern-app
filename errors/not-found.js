import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customer-api.js";

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
