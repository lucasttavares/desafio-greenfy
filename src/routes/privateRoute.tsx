import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PrivateRouteI } from "../utils/types";
import Cookies from "js-cookie";

const PrivateRoute: React.FC<PrivateRouteI> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);

    const checkAuthentication = () => {
      if (location.pathname === "/" && token) {
        navigate("/todo");
      } else if (location.pathname === "/todo" && !token) {
        navigate("/");
      }
    };
    checkAuthentication();
  }, [location.pathname, navigate]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
