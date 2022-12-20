import { async } from "@firebase/util";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import { db } from "../../firebase.config";
import useGetData from "../custom-hooks/useGetData";

const Users = () => {
  const { data: usersData, loading } = useGetData("users");
  const [users, setUsers] = useState(usersData);

  const deleteUser = async (id) => {
    // await deleteDoc(doc(db, "users", id));
    setUsers(users.filter((user) => user.id !== id));
    toast.success("Deleted!");
  };

  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table all">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loading ? (
                <p className="text-center fw-bold py-5">Loading....</p>
              ) : (
                <tbody>
                  {users?.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt="" />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(user.uid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
