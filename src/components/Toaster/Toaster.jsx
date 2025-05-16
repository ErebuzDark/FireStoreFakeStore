import React from "react";
import { ToastContainer } from "react-toastify";

const Toaster = () => {
  return (
    <ToastContainer
      position="top-right"
      limit={3}
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
  );
};

export default Toaster;
