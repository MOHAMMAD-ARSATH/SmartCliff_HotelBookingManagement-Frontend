import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";

function Register({ closeModal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  useEffect(() => {
    const checkExistingEmail = async () => {
      try {
        if (email.trim() !== "") {
          const result = await axios.post("/api/users/checkemail", { email });
          if (result.data.exists) {
            setEmailError("This email is already associated with an existing account.");

          } else {
            setEmailError("");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkExistingEmail();
  }, [email]);

  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!value) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }

    setEmail(value);
  };

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z]{4,}$/;

    if (!value) {
      setNameError("Name is required");
    } else if (!nameRegex.test(value)) {
      setNameError("Invalid name format");
    } else {
      setNameError("");
    }

    setName(value);
  };

  const validatePhone = (value) => {
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!value) {
      setPhoneError("Phone number is required");
    } else if (!phoneRegex.test(value)) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }

    setPhone(value);
  };

  const validatePassword = (value) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!value) {
      setPasswordError("Password is required");
    } else if (!strongPasswordRegex.test(value)) {
      setPasswordError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }

    setPassword(value);
  };

  const validateCpassword = (value) => {
    if (!value) {
      setCpasswordError("Confirm Password is required");
    } else if (value !== password) {
      setCpasswordError("Passwords do not match");
    } else {
      setCpasswordError("");
    }

    setCpassword(value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowCpassword = () => {
    setShowCpassword(!showCpassword);
  };

  async function register() {
    const missingFields = [];

    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("Email");
    if (!phone) missingFields.push("Phone number");
    if (!password) missingFields.push("Password");
    if (!cpassword) missingFields.push("Confirm Password");

    if (missingFields.length > 0) {
      setError(`Missing fields: ${missingFields.join(", ")}`);
      return;
    }

    if (password === cpassword) {
      const user = {
        name,
        email,
        phone,
        password,
        cpassword,
      };

      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const result = (await axios.post("/api/users/register", user)).data;
        console.log(result);
        setSuccess(result);

        // Close the modal after successful registration
        setTimeout(() => {
          setSuccess(""); // Clear success message after 2 seconds
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setCpassword("");
          closeModal();
        }, 2000);
      } catch (error) {
        console.log(error);
        setError(error);
      }

      setLoading(false);
    } else {
      setError("Password not matched");
    }
  }


  return (
    <Modal
      visible={true}
      onOk={register}
      onCancel={closeModal}
      footer={[
        <button
          key="submit"
          type="primary"
          className="btn btn-primary"
          loading={loading}
          onClick={register}
        >
          Sign up
        </button>,
      ]}
    >
      {loading && <Loader></Loader>}
      {error.length > 0 && <Error msg={error}></Error>}
      {success.length > 0 && <Success msg={success}></Success>}
      <h2>Sign Up</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        value={name}
        onChange={(e) => validateName(e.target.value)}
      />
      {nameError && <span style={{ color: "red" }}>{nameError}</span>}
      <input
        type="text"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => validateEmail(e.target.value)}
      />
      {emailError && <span style={{ color: "red" }}>{emailError}</span>}
      <input
        type="text"
        className="form-control"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => validatePhone(e.target.value)}
      />
      {phoneError && <span style={{ color: "red" }}>{phoneError}</span>}
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
        />
        <span
          className="password-toggle"
          onClick={toggleShowPassword}
        >
          {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
      </div>
      {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}

      <div className="password-container">
        <input
          type={showCpassword ? "text" : "password"}
          className="form-control"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => validateCpassword(e.target.value)}
        />
        <span
          className="password-toggle"
          onClick={toggleShowCpassword}
        >
          {showCpassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
      </div>
      {cpasswordError && (
        <span style={{ color: "red" }}>{cpasswordError}</span>
      )}

    </Modal>
  );
}

export default Register;
