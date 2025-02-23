import { Navigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { TENANT_LOGIN_PATH } from "./ROUTE_CONSTANT";

export const ProtectedRoute = ({
  isLoggedIn,
  redirectPath = TENANT_LOGIN_PATH,
  children,
}) => {
  // console.log(isLoggedIn, " csmkamcam ", redirectPath, children);
  
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace={true}  />;
  }

  return (
    <div>
        <Layout>
          {children}
        </Layout>
    </div>
  );
};