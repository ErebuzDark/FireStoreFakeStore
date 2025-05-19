import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@layout/Header/Header";
import SideBar from "@layout/SideBar/SideBar";
import Footer from "@layout/Footer/Footer";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = null;
    try {
      isLoggedIn = localStorage.getItem("token");
    } catch (e) {
      console.warn("localStorage is not available, checking sessionStorage...");
      try {
        isLoggedIn = sessionStorage.getItem("token");
      } catch (e) {
        console.warn("sessionStorage is also not available:", e);
      }
    }
  }, []);

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
