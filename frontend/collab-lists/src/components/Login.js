import { React, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  //login and redirect to home page
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/users/login?username=${username}`
      )
      .then((res) => {
        if (res.status === 200) {
          setUser(username);
          window.localStorage.setItem("user", username);
          navigate("/");
        } else {
          setError(res.json);
        }
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login/Signup
        </Button>
      </Form>
      {error}
    </div>
  );
};

export default Login;
