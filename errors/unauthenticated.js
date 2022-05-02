import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customer-api.js";

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
