import React from "react";
import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to="/">stats</Link>
        <Link to="all-jobs">all jobs</Link>
        <Link to="add-job">add job</Link>
        <Link to="profile">profile</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
};

export default SharedLayout;
