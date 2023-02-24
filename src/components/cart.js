import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import AppNavBar from "./navbar";
import CartIteam from "./cartIteam";

import cartApi from "../services/cartApi";
import orderApi from "../services/orderApi";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const navigate = useNavigate();
  const calculateCartValue = () => {
    let total = 0;
    // eslint-disable-next-line
    cart.map((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const orderBook = async (book) => {
    try {
      book.order_value = book.quantity * book.price;
      const res = await orderApi.addOrder(book);
      await removeFromCart(book.book_id);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const orderAll = () => {
    try {
      cart.map(async (book) => {
        // eslint-disable-next-line
        const res = await orderBook(book);
      });
      setTimeout(() => {
        navigate("/order");
      }, 500);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFromCart = async (id) => {
    try {
      setCart([...cart.filter((book) => book.book_id !== id)]);
      // eslint-disable-next-line
      const res = await cartApi.removeFromCart(id);
      setShow(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateCart = async (updatedBook, saveToDatabase = false) => {
    setCart([
      ...cart.slice(
        0,
        cart.findIndex((book) => book.book_id === updatedBook.book_id)
      ),
      updatedBook,
      ...cart.slice(
        cart.findIndex((book) => book.book_id === updatedBook.book_id) + 1
      ),
    ]);

    if (saveToDatabase) {
      try {
        // eslint-disable-next-line
        const res = await cartApi.updateCart(updatedBook);
        setShow(true);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const fetchData = async () => {
    const _cart = await cartApi.getCartItems();
    setCart(_cart.data);
    console.log(_cart.data);
  };

  useEffect(() => {
    fetchData();
  }, [setCart]);

  return (
    <div>
      <AppNavBar />
      <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-transparent position-relative"
      >
        <ToastContainer className="p-3" position={"top-end"}>
          <Toast show={show} onClose={toggleShow}>
            <Toast.Header closeButton className="text-success">
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Cart Update</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>Your cart has been updated</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
      <div className="my-3 text-center h3">Your cart items</div>
      <div className="container container-fluid">
        {cart.length === 0 ? (
          <div className="text-center text-danger alert alert-danger">
            Noting to show in cart
          </div>
        ) : (
          ""
        )}
        <div className="card">
          <div className="card-header h3">Cart Summary</div>
          <div className="card-body">
            <div className="my-2">
              <b>Numbers of Item:</b> {cart.length}
            </div>
            <div className="col">
              <b>Cart Value:</b> ₹ {calculateCartValue()}
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={orderAll}>
              Order All
            </button>
          </div>
        </div>
        {cart.map((book, index) => (
          <div key={index}>
            <CartIteam
              book={book}
              removeFromCart={removeFromCart}
              updateCart={updateCart}
              orderBook={orderBook}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
