import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Row } from "reactstrap";
import useAuth from "../custom-hooks/useAuth";

import "../styles/admin-nav.css";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-products",
    path: "/dashboard/all-products",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();

  const [menuOn, setMenuOn] = useState(false);
  const menuToggle = () => {
    setMenuOn(!menuOn);
    // console.log("clicked");
  };

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <Link to="/home">
                <div className="logo">
                  <h2>Shopmart</h2>
                </div>
              </Link>

              <div className="search__box">
                <input type="text" placeholder="Search...." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>

              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <img src={currentUser && currentUser.photoURL} alt="" />
              </div>

              {/* mobile menu  */}
              <div className="mobile__menu" onClick={menuToggle}>
                <span>
                  <i className="ri-menu-line"></i>
                </span>
              </div>

              <div
                className="mobile__nav"
                style={{ display: `${menuOn ? "block" : "none"}` }}
              >
                <button className="btn cross__btn" onClick={menuToggle}>
                  <i className="ri-close-circle-line fs-1"></i>
                </button>
                {admin__nav.map((item, index) => (
                  <li className="admin__mobile__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
