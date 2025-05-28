import React, { useState, useRef } from "react";
import axios from "axios";
import "../css/Account.css";
import { useNavigate } from "react-router-dom";


const CreateAccount = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateName = (name) => {
    if (!name.trim()) {
      setErrMsg("Enter valid Name");
      nameRef.current?.focus();
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      setErrMsg("Enter valid Email");
      emailRef.current?.focus();
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      setErrMsg("Enter valid Password");
      passwordRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!validateName(name) || !validateEmail(email) || !validatePassword(password)) return;

    try {
      // Check if user already exists
      const res = await axios.get(`${BASE_URL}/Profiles`);
      const exists = res.data.find((user) => user.Email === email);

      if (exists) {
        setErrMsg("Email already registered. Please log in.");
        return;
      }

      // POST to Profiles
      await axios.post(`${BASE_URL}/Profiles`, {
        name,
        Email: email,
        Password: password,
      });

      alert("Account created successfully!");
      navigate("/LogIn");
    } catch (err) {
      console.error("Account creation error:", err);
      setErrMsg("Server error while creating account");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleCreateAccount} className="form-container">
        <div className="form">
          <h3 className="heading">SIGN UP</h3>
          <div style={{ color: "red" }}>{errMsg}</div>
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="Name"
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button">SIGN UP</button>
          <div className="foot">
            <p onClick={() => navigate("/LogIn")}>Already have an account? Login</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
