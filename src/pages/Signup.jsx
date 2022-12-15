import React, { useState } from "react";
import Helmet from "../components/helmet/Helmet";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import "../styles/login.css";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase.config";

import { doc, setDoc } from "firebase/firestore";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error(error.message);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            // store user data in firestore db
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("something went wrong");
    }
  };
  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <h5 className="text-center fw-bold">Loading....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Signup</h3>

                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </FormGroup>
                  <button type="submit" className="buy__btn auth__btn">
                    Create an Account
                  </button>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
