import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Todo from "../pages/todo";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute children={<Login />} />} />
        <Route path="/todo" element={<PrivateRoute children={<Todo />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
