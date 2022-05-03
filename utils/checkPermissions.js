import { request } from "express";
import { UnauthenticatedError } from "../errors/index.js";

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) {
    return;
  }
  throw new UnauthenticatedError("Not authorize to access this route.");
};

export default checkPermission;
