import { Route, Routes } from "react-router-dom";
import App from "./App";
import { Suspense } from "react";
// import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUsers from "./components/Admin/Content/ManageUsers";
import Dashboard from "./components/Admin/Content/Dashboard";
import Login from "./components/Auth/Login";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import SignUp from "./components/Auth/SignUp";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";

import PrivateRoute from "./routes/PrivateRoute";

const NotFound = () => {
  return (
    <div className="alert alert-danger container mt-3">404.NOT DOUND DATA</div>
  );
};
const Layout = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route
            path="/users"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <PrivateRoute>
                <DetailQuiz />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
};

export default Layout;
