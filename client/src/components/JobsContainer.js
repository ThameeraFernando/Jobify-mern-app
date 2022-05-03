import React, { useEffect } from "react";
import { useAppContext } from "../Context/appContext";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
const JobsContainer = () => {
  const { jobs, getJobs, isLoading, page, totalJobs } = useAppContext();

  //call get job method
  useEffect(() => {
    getJobs();
  }, []);

  //check is loading
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
  // return <div>JobsContainer</div>;
};

export default JobsContainer;
