import React, { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImg, setProductImg] = useState(null);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5">Add Product</h4>

            <Form>
              <FormGroup className="form__group">
                <span>Product title</span>
                <input
                  required
                  type="text"
                  placeholder="Double Sofa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="form__group">
                <span>Short Description</span>
                <input
                  required
                  type="text"
                  placeholder="lorem....."
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="form__group">
                <span>Description</span>
                <input
                  required
                  type="text"
                  placeholder="Description....."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>

              <div className="d-flex align-items-center justify-content-between gap-5">
                <FormGroup className="form__group w-50">
                  <span>Price</span>
                  <input
                    required
                    type="text"
                    placeholder="$100"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group w-50">
                  <span>Category</span>
                  <select
                    className="w-100 p-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="chair">Chair</option>
                    <option value="sofa">sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>

              <div>
                <FormGroup className="form__group">
                  <span>Product Image</span>
                  <input type="file" required />
                </FormGroup>
              </div>

              <button className="buy__btn" type="submit">
                Add Product
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
