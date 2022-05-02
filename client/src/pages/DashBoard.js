import React, { useEffect } from "react";
import { useAppContext } from "../Context/appContext";

const DashBoard = () => {
  useAppContext();
  const fetchData = async () => {
    try {
      const response = await fetch("/api/v1");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>DashBoard</div>;
};

export default DashBoard;
