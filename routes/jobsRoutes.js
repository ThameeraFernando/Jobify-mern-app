import express from "express";
import {
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  showStatus,
} from "../Controllers/jobsController.js";
const router = express.Router();
router.route("/").get(getAllJobs).post(createJob);
router.route("/status").get(showStatus);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
