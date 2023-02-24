import React from "react";
import {
  PlusCircle,
  DashCircle,
  Trash3Fill,
  BagCheckFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function CartIteam({
  book,
  removeFromCart,
  updateCart,
  orderBook,
}) {
  return (
    <div className="card my-2">
      <div className="card-body">
        <div className="row">
          <div className="col col-2">
            <div>
              {book.cover ? (
                <img
                  src={book.cover.medium}
                  alt={book.title}
                  style={{
                    height: "238px",
                    width: "180px",
                    padding: "2px",
                    borderColor: "black",
                    borderRadius: "10px",
                    borderWidth: "2px",
                  }}
                ></img>
              ) : (
                "image not available"
              )}
            </div>
          </div>
          <div className="mx-2 col">
            <div className="h2">{book.title}</div>
            <span><Link to={`/book/${book.book_id}`}>View Details</Link></span>
            <div>
              <span className="">Quantity:</span>
              <DashCircle
                className="mx-2 text-danger"
                size={"20px"}
                onClick={() =>
                  book.quantity - 1 > 0
                    ? updateCart({ ...book, quantity: book.quantity - 1 })
                    : ""
                }
              />
              {book.quantity}
              <PlusCircle
                className="mx-2 text-success"
                size={"20px"}
                onClick={() =>
                  updateCart({ ...book, quantity: book.quantity + 1 })
                }
              />
            </div>
            <div>
              <span className="">Price:</span> {book.quantity * book.price}
            </div>
            {/* <div className="mt-2"></div> */}

            <div className="mt-4">
              <button
                className="btn btn-primary"
                onClick={() => updateCart(book, true)}
              >
                Apply
              </button>
              <span className="mx-1 text-danger">
                <small>Click on apply to update permanently</small>
              </span>
            </div>

            <div className="mt-4">
              <Trash3Fill
                size={"30px"}
                className="text-danger"
                onClick={() => removeFromCart(book.book_id)}
              />
              <BagCheckFill
                size={"30px"}
                className="text-success"
                onClick={() => orderBook(book)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
