import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
//import middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
//import db connection
import ConnectDB from "./db/connect.js";
//import routes
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
//json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//home
app.get("/", (req, res) => {
  //   throw new Error();
  res.status(200).send("Welcome");
});
//auth router
app.use("/api/v1/auth", authRouter);
//jobs router
app.use("/api/v1/jobs", jobsRouter);
//middleware
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
