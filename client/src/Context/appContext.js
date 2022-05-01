import React, { useState, useReducer, useContext } from "react";
import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions";
import reducer from "./reducer";
export const initializeState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  //   const [state, setState] = useState(initializeState);
  const [state, dispatch] = useReducer(reducer, initializeState);
  //display alert Function
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  //clear alert function
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  //children is the app we are rendering
  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};
//custom hook
//make sure to use
//we can directly use the hook
//we don't need to pass the appContext
export const useAppContext = () => {
  return useContext(AppContext);
};
//to wrap the App component in index.js
export { AppProvider };
