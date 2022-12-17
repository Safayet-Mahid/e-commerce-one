import React from "react";
import { Col, Container, Row } from "reactstrap";

import "../styles/dashboard.css";
import useGetData from "../custom-hooks/useGetData";

const Dashboard = () => {
  const { data: users } = useGetData("users");
  const { data: products } = useGetData("products");
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="3" className="mb-3">
              <div className="revenue__box">
                <h5 className="mb-4">Total Sales</h5>
                <span>$12250</span>
              </div>
            </Col>
            <Col lg="3" className="mb-3">
              <div className="order__box">
                <h5 className="mb-4">Orders</h5>
                <span>265</span>
              </div>
            </Col>
            <Col lg="3" className="mb-3">
              <div className="products__box">
                <h5 className="mb-4">Total Products</h5>
                <span>{products.length}</span>
              </div>
            </Col>
            <Col lg="3" className="mb-3">
              <div className="products__box">
                <h5 className="mb-4">Total Users</h5>
                <span>{users.length}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
