import React, { useReducer, useContext } from "react";
//import axios library
import axios from "axios";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
} from "./actions";
import reducer from "./reducer";
//get values from local storage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

export const initializeState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  //job status
  // jobLocation: userLocation || "",
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
  //get job status
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
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
  // add user to local storage
  //execute when register and login
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  //remove person from local storage
  //execute when logout
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };
  //registerUser function
  const registerUser = async (currentUser) => {
    console.log(currentUser);
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  //login user
  const loginUser = async (currentUser) => {
    console.log(currentUser);
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //SETUP for both login and register
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    console.log(currentUser);
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
        },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //Toggle sidebar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  //logout user
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  // console.log(currentUser);
  //global setup
  //axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  //we default set the authorization header
  //but this is not good
  //because we send authorization header with all the requests
  //axios setup instance
  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
    // },
    //we send headers in interceptors
  });
  //interceptors
  //more like middleware
  //we invoke functions before we send requests and receive responses
  //useful to identify errors
  //request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        // console.log("AUTH ERROR");
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  // const { data } = await axios.patch(
  //   "/api/v1/auth/updateUser",
  //   currentUser,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${state.token}`,
  //     },
  //   }
  // );
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("auth/updateUser", currentUser);
      const { user, location, token } = data;
      // console.log(data);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          location,
          token,
        },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      // console.log(error.response);

      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  //handle jobStates
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: {
        name,
        value,
      },
    });
  };
  //clear job states
  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };
  //create a job
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      //call function instead of clear values
      dispatch({
        type: CLEAR_VALUES,
      });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //get all jobs
  const getJobs = async () => {
    let url = `/jobs`;
    dispatch({
      type: GET_JOBS_BEGIN,
    });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }
    clearAlert();
  };
  //execute getalljobs
  // useEffect(() => {
  //   getJobs();
  // }, []);

  //set editJob
  const setEditJob = (id) => {
    // console.log(`set edit job :${id}`);
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  //edit job
  const editJob = () => {
    console.log("edit job");
  };
  //delete job
  const deleteJob = (id) => {
    console.log(`delete job :${id}`);
  };
  //children is the app we are rendering
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
      }}
    >
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
