const createJob = async (req, res) => {
  res.send("createJob .");
};
const deleteJob = async (req, res) => {
  res.send("deleteJob .");
};
const updateJob = async (req, res) => {
  res.send("updateJob .");
};
const getAllJobs = async (req, res) => {
  res.send("getAllJobs .");
};
const showStatus = async (req, res) => {
  res.send("showStatus .");
};

export { createJob, getAllJobs, showStatus, deleteJob, updateJob };
