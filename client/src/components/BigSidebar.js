import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./logo";
import NavLinks from "../utils/NavLinks";
import { useAppContext } from "../Context/appContext";
const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
