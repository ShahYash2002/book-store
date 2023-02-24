import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Cart from "./components/cart";
import Order from "./components/order";
import Book from "./components/book";
import Error from "./components/error";
import BookDetails from "./components/bookDetails";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Book />,
  },
  {
    path: "/book/:id",
    element: <BookDetails />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/*",
    element: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
