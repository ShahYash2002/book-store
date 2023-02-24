import React from "react";
import { Link } from "react-router-dom";
import AppNavBar from "./navbar";
function error() {
  return (
    <div>
      <AppNavBar />
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh", marginTop: "-10%" }}
      >
        <div className="h1">404 | Page not Found</div>
        <div>
          <Link to="/" className="mt-3 btn btn-primary">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default error;
