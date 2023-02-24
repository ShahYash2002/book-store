import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import bookApi from "../services/bookApi";
import cartApi from "../services/cartApi";
import orderApi from "../services/orderApi";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ExclamationOctagon } from "react-bootstrap-icons";
import AppNavBar from "./navbar";

export default function BookDetails() {
  const [book, setBook] = useState({});

  const navigate = useNavigate();

  const [orderQuantity, setOrderQuantity] = useState(0);
  const { id } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showError, setShowError] = useState(false);
  const toggleShowError = () => setShow(!showError);

  const addToCart = async (book) => {
    try {
      // eslint-disable-next-line
      const res = await cartApi.addToCart(book);
      navigate("/cart");
    } catch (error) {
      setShow(false);
      setShowError(true);
      console.log(error.message);
    }
  };
  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      const order = {
        book_id: book.book_id,
        quantity: orderQuantity,
        order_value: orderQuantity * book.price,
      };
      console.log(order);
      // eslint-disable-next-line
      const res = await orderApi.addOrder(order);
      setShow(false);

      navigate("/order");
    } catch (error) {
      setShow(false);
      setShowError(true);
      console.log(error.message);
    }
  };
  const fetchData = async () => {
    const _book = await bookApi.getBookById(id);
    console.log(JSON.stringify(_book.data));
    setBook(_book.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div>
      <AppNavBar />
      <div className="d-flex justify-content-between mt-2">
        <div className="mx-5">
          <Link to={`/book/${parseInt(id) - 1}`} className="btn btn-primary">
            Prev
          </Link>
        </div>
        <div className="mx-5">
          <Link to={`/book/${parseInt(id) + 1}`} className="btn btn-primary">
            Next
          </Link>
        </div>
      </div>
      <div className="container container-fluid my-5">
        <div className="row">
          <div className="col col-lg-4 col-md-12">
            {book.cover ? (
              <img
                src={book.cover.large}
                alt=""
                style={{ width: "307px", height: "500px" }}
              />
            ) : (
              <img
                src="https://dummyimage.com/307x500/fff/000&text=image+not+available"
                alt=""
              />
            )}
            <div className="mt-2">
              <Link to="/" className="btn btn-success">
                Back to books page
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="mb-3 h2">{book.title}</div>
            <div className="mb-3">
              <b>Authors:</b>{" "}
              {book.authors
                ? book.authors.map((author, author_index) => (
                    <span key={author_index}>{author}, </span>
                  ))
                : "not available"}
            </div>
            <div className="mb-3">
              {" "}
              <b>Categories:</b>{" "}
              {book.categories
                ? book.categories.map((category, category_index) => (
                    <span
                      key={category_index}
                      className="badge bg-success p-2 mx-1 my-1"
                    >
                      {category}
                    </span>
                  ))
                : "not available"}
            </div>
            <div className="mb-3">
              <b>ISBN:</b> {book.isbn}
            </div>
            <div className="mb-3">
              <b>Price: </b>₹ {book.price}
            </div>
            <div className="mb-3">
              <b>Pages:</b> {book.number_of_pages}
            </div>
            <div className="mb-3">
              <b>Rating:</b> {book.rating}
            </div>
            <div className="mb-3">
              <b>Year of publishcation:</b> {book.publish_year}
            </div>
            <div className="mb-3">
              <b>Preview URL: </b>
              <a href={book.preview_url} target="_blank" rel="noreferrer">
                Click here
              </a>
            </div>
            <div className="mb-3">
              <b>Stock Status: </b> {book.stock_status}
            </div>
            <div className="mb-3">
              <b>Cart Status: </b>
              {book.in_cart ? (
                <Link to="/cart" className="btn btn-sm btn-warning">
                  Go to cart
                </Link>
              ) : (
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => addToCart({ ...book, quantity: 1 })}
                >
                  Add to cart
                </button>
              )}
            </div>
            <div className="mb-3">
              {book.has_ordered ? (
                <Button variant="primary" onClick={handleShow}>
                  Buy Again
                </Button>
              ) : (
                <Button variant="primary" onClick={handleShow}>
                  Buy Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <form className="form" onSubmit={placeOrder}>
          <Modal.Header closeButton>
            <Modal.Title>Order for "{book.title}"</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="mb-2">Quantity</label>
              <input
                type="number"
                min={1}
                max={book.quantity}
                placeholder="Enter quantity"
                className="form-control"
                onChange={(event) => setOrderQuantity(event.target.value)}
              />

              <div className="my-3 text-end">
                <b>Order Price:</b> ₹ {book.price * orderQuantity}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="success" type="submit">
              Place Order
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showError} onHide={() => toggleShowError()} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            <ExclamationOctagon className="mx-2" />
            Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            Make sure you signned in to order a book or to add a book to the
            cart
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowError(false);
            }}
          >
            Close
          </Button>
          <Link className="btn btn-success" to="/signin">
            Sign in
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
