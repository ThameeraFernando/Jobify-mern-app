import React from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../Context/appContext";
import { FormRow, Alert, FormRowSelect } from "../../components/index";

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    isLoading,
    editJob,
  } = useAppContext();

  //handle job input
  const handleSubmit = (e) => {
    e.preventDefault();
    //while testing comment
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
    // console.log("job created.");
  };
  //handle submit
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name} ${value}`);
    handleChange({ name, value });
  };
  return (
    <Wrapper>
      <form className="from">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            name="jobLocation"
            lableText="Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* status */}
          <FormRowSelect
            name="status"
            labelText="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* jobType */}
          <FormRowSelect
            name="jobType"
            list={jobTypeOptions}
            handleChange={handleJobInput}
            value={jobType}
          />
          <div className="btn-container">
            <button
              className="btn btn-block btn-submit"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
