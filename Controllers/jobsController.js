import Job from "../modals/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

//create a job
const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please Provide all  values.");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
//delete a job
const deleteJob = async (req, res) => {
  res.send("deleteJob .");
};
//update a job
const updateJob = async (req, res) => {
  res.send("updateJob .");
};
//get all jobs
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
//show status
const showStatus = async (req, res) => {
  res.send("showStatus .");
};

export { createJob, getAllJobs, showStatus, deleteJob, updateJob };
