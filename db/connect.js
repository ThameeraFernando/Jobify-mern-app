import mongoose from "mongoose";

const ConnectDB = (url) => {
  return mongoose.connect(url);
};

export default ConnectDB;
