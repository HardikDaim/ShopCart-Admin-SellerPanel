import React from "react";
import { HashLoader } from "react-spinners";

const LoaderOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <HashLoader color="#1D4ED8" />
  </div>
);

export default LoaderOverlay;
