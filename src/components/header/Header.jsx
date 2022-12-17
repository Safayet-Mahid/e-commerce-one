import React, { useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./header.css";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileActionsRef = useRef(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleProfileActions = () => {
    console.log("here");
    profileActionsRef.current.classList.toggle("show__profileActions");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />

              <div>
                <h1>Shopmart</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge_amount">2</span>
              </span>

              <span className="cart__icon">
                <NavLink to="/cart">
                  <i className="ri-shopping-bag-line"></i>
                  <span className="badge_amount">{totalQuantity}</span>
                </NavLink>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="user"
                  onClick={toggleProfileActions}
                />

                <div
                  className="profile__actions"
                  ref={profileActionsRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logout} className="border-4">
                      Logout
                    </span>
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center ">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
