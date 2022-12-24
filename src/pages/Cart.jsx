import React from "react";
import "../styles/cart.css";

import Helmet from "../components/helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { Container, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const totalAmount = useSelector((state) => state?.cart?.totalAmount);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />

      <Container className="cart-section">
        <Row>
          <Col lg="9">
            {cartItems?.length === 0 ? (
              <h1 className="fs-4 text-center">No item is added to the cart</h1>
            ) : (
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item, index) => (
                    <Tr key={index} item={item} />
                  ))}
                </tbody>
              </table>
            )}
          </Col>

          <Col lg="3">
            {cartItems.length > 0 && (
              <>
                <div>
                  <h6 className="d-flex align-items-center justify-content-between">
                    Subtotal
                    <span className="fs-4 fw-bold">${totalAmount}</span>
                  </h6>
                </div>

                <p className="fs-6 mt-2">
                  taxes and shipping will calculate in checkout
                </p>
                <div>
                  <Link to="/checkout">
                    <button className="buy__btn w-100 ">Checkout</button>
                  </Link>
                  <Link to="/shop">
                    <button className="buy__btn w-100 mt-3 mb-3">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantiity}px</td>
      <td>
        <motion.button
          whileTap={{ scale: 1.2 }}
          className="delete__btn"
          onClick={deleteProduct}
        >
          <i className="ri-delete-bin-line b"></i>
        </motion.button>
      </td>
    </tr>
  );
};

export default Cart;
