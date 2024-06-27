import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoaderOverlay from "../../components/LoaderOverlay";

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userInfo !== null && userInfo !== undefined) {
      setIsLoading(false);
    }
  }, [userInfo]);

  // console.log("Route:", route);
  // console.log("Role:", role);
  // console.log("UserInfo:", userInfo);

  if (isLoading) {
    // console.log("Loading user info...");
    return <LoaderOverlay />;
  }

  if (!role) {
    // console.log("Redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (!userInfo) {
    console.log("Redirecting to unauthorized: userInfo is undefined");
    return <Navigate to="/unauthorized" replace />;
  }

  if (route?.role && userInfo?.role !== route?.role) {
    console.log("Redirecting to unauthorized: role mismatch");
    return <Navigate to="/unauthorized" replace />;
  }

  if (route?.status && route?.status !== userInfo?.status) {
    if (userInfo?.status === "pending") {
      console.log("Redirecting to account pending");
      return <Navigate to="/seller/account-pending" replace />;
    }
     else if (userInfo?.status === "deactive") {
      console.log("Redirecting to account deactive");
      return <Navigate to="/seller/account-deactive" replace />;
    }
  }

  if (route?.visibility && !route?.visibility.includes(userInfo?.status)) {
    console.log("Redirecting to account pending: visibility check failed");
    return <Navigate to="/seller/account-pending" replace />;
  }

  if (route?.ability && route?.ability !== role) {
    console.log("Redirecting to unauthorized: ability mismatch");
    return <Navigate to="/unauthorized" replace />;
  }

  // console.log("Rendering children");
  return <Suspense fallback={<LoaderOverlay />}>{children}</Suspense>;
};

export default ProtectRoute;
