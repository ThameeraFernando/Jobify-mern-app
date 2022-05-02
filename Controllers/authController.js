import User from "../modals/User.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values.");
  }
  //   res.send("register user.");
  //   try {
  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
    },
    token,
    location: user.location,
  });
  //   } catch (error) {
  //     // throw new Error({});
  //     // res.status(500).json({ msg: error });
  //     next(error);
  //   }
};

//login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values.");
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

//update user
const updateUser = async (req, res) => {
  console.log(req.user);
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser };
