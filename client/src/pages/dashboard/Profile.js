import React, { useState } from "react";
import { Alert } from "../../components";
import FormRow from "../../components/FormRow";
import { useAppContext } from "../../Context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  //form handle
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!name || !email || !lastName || !location) {
    //   displayAlert();
    //   return;
    // }
    //update user
    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            text="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            lableText="last name"
            text="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            text="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            text="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "please wait" : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
