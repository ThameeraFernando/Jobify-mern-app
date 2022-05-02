import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Navbar";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <Wrapper>
      <FaHome />
      <nav>
        <Link to="/">stats</Link>
        <Link to="all-jobs">all jobs</Link>
        <Link to="add-job">add job</Link>
        <Link to="profile">profile</Link>
      </nav>
    </Wrapper>
  );
};

export default Navbar;
