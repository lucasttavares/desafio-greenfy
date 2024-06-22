import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { PublicRouteI } from "../utils/types";

const PublicRoute: React.FC<PublicRouteI> = ({ children }) => {
  const token = Cookies.get("token");

  return token ? <Navigate to="/todo" /> : children;
};

export default PublicRoute;
