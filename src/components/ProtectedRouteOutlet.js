import React, { useContext } from "react";
import { AuthData } from "../context/auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteOutlet = ( ) => {
  const { user } = useContext(AuthData);
    return user ? <Outlet /> : <Navigate replace to="/login" />
};
export default ProtectedRouteOutlet;