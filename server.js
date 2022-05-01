import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
//import middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import ConnectDB from "./db/connect.js";

app.get("/", (req, res) => {
  //   throw new Error();
  res.status(200).send("Welcome");
});

//middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await ConnectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
