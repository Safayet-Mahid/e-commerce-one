import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Routers from "../../routers/Routers";
import { useLocation } from "react-router-dom";
import AdminNav from "../../admin/AdminNav";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}

      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
