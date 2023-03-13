import React, { useState, useEffect } from "react";

import AppNavBar from "./navbar";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import orderApi from "../services/orderApi";
import { Link } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const handleCancelOrder = async (id) => {
    try {
      // console.log("delete request");
      // console.log(id);
      // eslint-disable-next-line
      const res = await orderApi.cancelOrder(id);

      setOrders([...orders.filter((order) => order.book_id !== id)]);
      setShow(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchData = async () => {
    try {
      const res = await orderApi.getOrders();
      // console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      // console.log("login required");
    }
  };

  useEffect(() => {
    fetchData();
  }, [setOrders]);

  return (
    <div>
      <AppNavBar />
      <div className="container container-fluid">
        <div className="h2 text-center mt-2">Your Orders</div>
        <ToastContainer className="p-3" position={"top-end"}>
          <Toast show={show} onClose={toggleShow}>
            <Toast.Header closeButton className="text-danger">
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Order Canceled</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>Your order has been canceled</Toast.Body>
          </Toast>
        </ToastContainer>
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cover</th>
              <th scope="col">Title</th>
              <th scope="col">Order Date</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  className="text-center text-lowercase text-dark"
                  colSpan={100}
                >
                  No orders yet...
                </td>
              </tr>
            ) : (
              ""
            )}
            {orders.map((_order, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>
                  {_order.cover ? (
                    <img
                      style={{ height: "100px", heigth: "150px" }}
                      src={_order.cover.large}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <Link to={`/book/${_order.book_id}`}>{_order.title}</Link>
                </td>
                <td>
                  {_order.order_date.replace("T", " at ").replace(/.{8}$/g, "")}
                </td>
                <td>{_order.quantity}</td>
                <td>₹ {_order.order_value}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancelOrder(_order.book_id)}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// export default order;
