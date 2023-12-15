import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import Register from "./Register"; // Import the Register component
import { Modal, Button } from "antd"; // Import Modal and Button from Ant Design
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

function Login({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setLoading(false);
    setError("");
    setEmailError("");
  }, []); // Reset state when the modal is opened

  const validateEmail = (value) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!value) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }

    setEmail(value);
  };

  const validatePassword = (value) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!value) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    setPassword(value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function login() {
    // Check if fields are empty
    if (!email.trim() || !password) {
      setEmailError(email.trim() ? "" : "Email is required");
      setPasswordError(password ? "" : "Password is required");
      return;
    }

    setLoading(true);
    const user = {
      email: email.trim(),
      password: password,
      name: "Admin"
    };

    if (email.trim() === "hotel@gmail.com" && password === "admin") {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/admin");
    } else {
      try {
        const result = (await axios.post("/api/users/login", user)).data;
        sessionStorage.setItem("currentUser", JSON.stringify(result));
        navigate("/allrooms");
      } catch (error) {
        console.log(error);
        setError("Invalid Credentials");
      }
    }

    setLoading(false);
  }

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <Modal
      visible={true}
      onOk={login}
      onCancel={closeModal}
      footer={[]}
    >
      {/* {loading && <Loader></Loader>} */}
      {error.length > 0 && <Error msg={error}></Error>}
      {error.length > 0 && <Error msg={error}></Error>}
      <div>
        <h2>Sign In</h2>

        <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => validateEmail(e.target.value)}
        />
        {emailError && <span style={{ color: "red" }}>{emailError}</span>}
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
        />
        {passwordError && <span className='mb-5' style={{ color: "red" }}>{passwordError}</span>}
        <span
          className="password-toggle mt-4 mr-4 "
          onClick={toggleShowPassword}
        >
          {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
        {loading ? (
          <div>Signin...Please Wait...</div>
        ) : (
          <>
            <div >
              <button className="btn btn-primary mt-3" onClick={login}>
                Sign in
              </button>
              <div
                className="mt-4"
                style={{ float: "right", color: "black", cursor: "pointer" }}
                onClick={openRegisterModal}
              >
                Click here to sign up?
              </div>
            </div>

          </>
        )}
      </div>

      {showRegisterModal && <Register closeModal={closeRegisterModal} />}
    </Modal>
  );
}

export default Login;

