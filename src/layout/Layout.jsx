import React, { useEffect, useContext } from "react";
import { Context } from '@contexts/ContextProvider';

import { useNavigate } from "react-router-dom";
import Header from "@layout/Header/Header";
import SideBar from "@layout/SideBar/SideBar";
import Footer from "@layout/Footer/Footer";

const Layout = ({ children }) => {
  const { setUserInfo } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    let token = null;

    try {
      token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const userData = JSON.parse(
        localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo")
      );
      if (userData) setUserInfo(userData);
      if (!token) {
        console.warn("User is not authenticated. Redirecting to login...");
        navigate("/");
      }
    } catch (e) {
      console.warn("Error accessing storage:", e);
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="flex flex-row h-auto">
        <SideBar />
        <div className="m-3 md:m-10 bg-white shadow w-full">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
