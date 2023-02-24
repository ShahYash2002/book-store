import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userApi from "../services/userApi";
export default function SignIn() {
  const [email, setEmail] = useState("user1@book-world.com");
  const [password, setPassword] = useState("abc");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("login requested");
    const credentials = {
      email,
      password,
    };

    try {
      const res = await userApi.signin(credentials);
      console.log(res.data);
      localStorage.token = res.data.token;
      navigate("/");
    } catch (error) {
      let alert = document.getElementById("alert");
      alert.innerHTML = "Invalid credentials";
      alert.style.display = "block";
    }
  };
  return (
    <div className="container mt-5">
      <div className="h1 text-center">Book's World</div>
      <div
        id="alert"
        className="alert alert-danger"
        style={{ display: "none" }}
      ></div>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="h2 mb-4">Sign in</h2>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            required
            type="email"
            // value="user1@book-world.com"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            required
            type="password"
            // value="abc"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
        <div className="mt-2">
          Not have an account?{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none" }}
          >
            sign up here
          </Link>
        </div>
      </form>
    </div>
  );
}
