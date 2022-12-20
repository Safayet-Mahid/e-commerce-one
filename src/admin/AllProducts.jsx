import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../styles/allproduct.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import { db } from "../../firebase.config";
import useGetData from "../custom-hooks/useGetData";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");
  const [products, setProducts] = useState([]);

  const deleteProduct = async (id) => {
    // await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((item) => item.id !== id));
    toast.success("Deleted!");
  };

  useEffect(() => {
    setProducts(productsData);
    console.log();
  }, [productsData]);

  return (
    <section>
      <Container>
        <Link to="/dashboard/add-products">
          <button className="buy__btn mb-5 d-flex align-items-center gap-2 ">
            <i className="ri-add-line fs-4"></i> <span>Add New</span>
          </button>
        </Link>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5 text-center fw-bold">Loading....</h4>
            ) : (
              <table className="table all">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, key) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
