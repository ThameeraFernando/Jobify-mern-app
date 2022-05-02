import React from "react";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
// import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./pages/ProtectedRoute";
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Status,
} from "./pages/dashboard";
const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/register">Register</Link>
        <Link to="/landing">Home</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Status />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
