import { addDoc, setDoc, collection, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { db, storage } from "../../firebase.config";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const product = {
      productName: title,
      shortDesc,
      description,
      imgUrl: productImg,
      price,
      category,
    };

    // ============add product to the firebase============
    try {
      const docRef = collection(db, "products");
      const productImageRef = ref(
        storage,
        `product/${Date.now() + productImg.name}`
      );
      const uploadTask = uploadBytesResumable(productImageRef, productImg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          toast.error("Image not uploaded!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            product.imgUrl = downloadURL;
            await addDoc(docRef, product);
          });
        }
      );
      setLoading(false);
      toast.success("Product successfully added!");
      navigate("/dashboard/all-products");
    } catch (error) {
      setLoading(false);
      toast.error("Product not added!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading.....</h4>
            ) : (
              <>
                <h4 className="mb-5">Add Product</h4>

                <Form onSubmit={addProduct}>
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
                        <option>Select category</option>
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
                      <input
                        type="file"
                        required
                        onChange={(e) => setProductImg(e.target.files[0])}
                      />
                    </FormGroup>
                  </div>

                  <button className="buy__btn" type="submit">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
