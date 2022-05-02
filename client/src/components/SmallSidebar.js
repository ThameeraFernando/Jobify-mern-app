import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../Context/appContext";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import Logo from "./logo";
import NavLinks from "../utils/NavLinks";
const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
          {/* navlink */}
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
