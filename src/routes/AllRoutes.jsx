/** @format */

import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./ProtectedRoute";
import { PRIVATE_TENANT_ROUTE, TENANT_PUBLIC_ROUTE } from "./ROUTE_CONSTANT";
import { PublicRoute } from "./PublicRoute";
import { TENANT_ROLE } from "../utils/utils";

const AllRoutes = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  // const isLoggedIn = true;
  // const user = { name: "Fiza", email: "fiza@nspg.com", role: TENANT_ROLE };
  const role = user?.role || TENANT_ROLE;

  console.log({ isLoggedIn, user });

  return (
    <Routes>
      {TENANT_PUBLIC_ROUTE.map(({ id, path, Component }) => (
        <Route
          key={id}
          path={path}
          element={
            <PublicRoute isLoggedIn={isLoggedIn} isAdmin={false}>
              <Component />
            </PublicRoute>
          }
        />
      ))}

      {PRIVATE_TENANT_ROUTE.map(({ id, path, Component }) => (
        <Route
          key={id}
          path={path}
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Component />
            </ProtectedRoute>
          }
        />
      ))}

      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Navigate to="/tenant/dashboard" />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/tenant/dashboard" replace />} />
    </Routes>
  );
};

export default AllRoutes;
