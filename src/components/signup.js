import React, { useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../services/userApi";

export default function SignUp() {
  const [name, setName] = useState("YashShah");
  const [email, setEmail] = useState("yashshah@book-world.com");
  const [password, setPassword] = useState("abc");
  const [confirmPassword, setConfrimPassword] = useState("abc");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validatePassword()) {
      const user = {
        name,
        email,
        password,
      };

      try {
        const res = await userApi.signup(user);
        console.log(res.data);
      } catch (error) {
        let alert = document.getElementById("error");
        alert.innerHTML = "user already exists";
        alert.style.display = "block";
      }
    } else {
      let alert = document.getElementById("error");
      alert.innerHTML = "password and confirm password must be same";
      alert.style.display = "block";
    }
  };

  const validatePassword = () => {
    return password == confirmPassword;
  };
  return (
    <div className="container mt-5">
      <div className="h1 text-center mb-3">Book's World</div>
      <div
        id="error"
        className="alert alert-danger text-capitalize"
        style={{ display: "none" }}
      ></div>
      <div className="h2 mb-3">Sign up</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            required
            type="password"
            className="form-control"
            onChange={(event) => setConfrimPassword(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <input type="submit" className="btn btn-primary" value="Sign up" />
        </div>
      </form>
      <div className="mt-2">
        Already have an account?{" "}
        <Link
          to="/signin"
          // className="text-white"
          style={{ textDecoration: "none" }}
        >
          sign in here
        </Link>
      </div>
    </div>
  );
}
