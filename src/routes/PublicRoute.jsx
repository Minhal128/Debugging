/** @format */

import { Navigate } from "react-router-dom";

export const PublicRoute = ({ isLoggedIn, redirectPath = "dashboard", children }) => {
  if (isLoggedIn) {
    return <Navigate to={`/tenant/${redirectPath}`} replace={true} />;
  }

  return <>{children}</>;
};
