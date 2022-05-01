import User from "../modals/User.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values.");
  }
  //   res.send("register user.");
  //   try {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ user });
  //   } catch (error) {
  //     // throw new Error({});
  //     // res.status(500).json({ msg: error });
  //     next(error);
  //   }
};
const login = async (req, res) => {
  res.send("login user.");
};
const updateUser = async (req, res) => {
  res.send("update user.");
};

export { register, login, updateUser };
