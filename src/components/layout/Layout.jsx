import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Routers from "../../routers/Routers";
import { useLocation } from "react-router-dom";
import AdminNav from "../../admin/AdminNav";
import "../../styles/layout.css";
const Layout = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}

      <div className="layout">
        <Routers />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
