import React, { useState } from "react";
import Helmet from "../components/helmet/Helmet";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/login.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase.config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  const signIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      toast.success("Successfully logged in");
      setLoading(false);

      location.state ? navigate(location.state?.pathname) : navigate("/home");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <h5 className="text-center fw-bold">Loading.....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>

                <Form className="auth__form" onSubmit={signIn}>
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
                  <button type="submit" className="buy__btn auth__btn">
                    Login
                  </button>
                  <p>
                    Dont't have an account?{" "}
                    <Link to="/signup">Create an account</Link>
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

export default Login;
