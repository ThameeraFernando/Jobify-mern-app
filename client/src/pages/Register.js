import React, { useEffect, useState } from "react";
import { Logo, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "../components/FormRow";
//useNavigate to navigate to dashBoard
import { useNavigate } from "react-router-dom";
//get the hook from appContext
import { useAppContext } from "../Context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const { isLoading, showAlert, displayAlert, registerUser, user } =
    useAppContext();
  const [values, setValues] = useState(initialState);
  //global state and use Navigator
  const navigate = useNavigate();
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
    const currentUser = { name, email, password };
    if (isMember) {
      console.log("already a member");
    } else {
      registerUser(currentUser);
    }
    console.log(values);
  };
  //navigate back to the dashboard
  //this is placed after the form handle
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
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
          <button
            type="button"
            onClick={toggleMember}
            disabled={isLoading}
            className="member-btn"
          >
            {values.isMember ? "Register" : "Login"}
          </button>
          {/* disabled {isLoading}=>disable the button while loading */}
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
