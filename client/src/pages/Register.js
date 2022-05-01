import React, { useEffect, useState } from "react";
import { Logo, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "../components/FormRow";
//get the hook from appContext
import { useAppContext } from "../Context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const { isLoading, showAlert, displayAlert } = useAppContext();
  const [values, setValues] = useState(initialState);
  //global state and use Navigator

  //handle inputs
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //form handle
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    console.log(values);
  };
  //toggle function
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo></Logo>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name inputs */}
        {!values.isMember && (
          <FormRow
            name="name"
            value={values.name}
            type="text"
            lableText="name"
            handleChange={handleChange}
          />
        )}

        {/* name inputs */}
        <FormRow
          name="email"
          value={values.email}
          type="email"
          lableText="email"
          handleChange={handleChange}
        />
        {/* name inputs */}
        <FormRow
          name="password"
          value={values.password}
          type="password"
          lableText="password"
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          {values.isMember ? "Not yet a member?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
