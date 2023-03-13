import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import AppNavBar from "./navbar";

import bookApi from "../services/bookApi";
import cartApi from "../services/cartApi";

export default function Example() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const addToCart = async (book) => {
    try {
      const res = await cartApi.addToCart(book);
      navigate("/cart");
    } catch (error) {
      console.log(error.message);
    }
  };
  let filteredBooks = (key, value) =>
    books.filter((book) => {
      switch (key) {
        case "title":
          return book.title.indexOf(value) != -1;
        case "author":
          return (
            book.authors.findIndex((author) => author.indexOf(value) != -1) !=
            -1
          );
        case "category":
          return (
            book.categories.findIndex(
              (category) => category.indexOf(value) != -1
            ) != -1
          );
        default:
          return true;
      }
    });

  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const fetchData = async () => {
    const _books = await bookApi.getBooks();
    setBooks(_books.data);
    // console.log(_books.data);
  };

  useEffect(() => {
    fetchData();
  }, [setBooks]);
  return (
    <div>
      <AppNavBar />
      <div className="container container-fluid mt-3">
        <div className="h2 text-center">Books in Book's World</div>
        <div className="text-end">
          <span>
            Results: Total <b>{filteredBooks(filterKey, filterValue).length}</b>{" "}
            books found
            {filterKey != "" ? (
              <span className="mx-2">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setFilterKey("");
                    setFilterValue("");
                  }}
                >
                  Clear Filters
                </button>
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
        <div className="d-flex my-3 justify-content-around">
          <div className="input-group mx-2">
            <div className="input-group-append">
              <span className="input-group-icon mx-2">
                <Search onClick={() => setFilterKey("title")} size={"20px"} />
              </span>
            </div>
            <input
              type="text"
              list="titles"
              onChange={(event) => {
                setFilterKey("title");
                setFilterValue(event.target.value);
              }}
              placeholder="Search by title"
              className="form-control"
            />
            <datalist id="titles">
              {books.map((book, index) => (
                <option value={book.title} key={index}>
                  {book.title}
                </option>
              ))}
            </datalist>
          </div>

          <div className="input-group mx-2">
            <div className="input-group-append">
              <span className="input-group-icon mx-2">
                <Search onClick={() => setFilterKey("author")} size={"20px"} />
              </span>
            </div>

            <input
              type="text"
              list="authors"
              onChange={(event) => {
                setFilterKey("author");
                setFilterValue(event.target.value);
              }}
              placeholder="Search by author"
              className="form-control"
            />
            <datalist id="authors">
              {books.map((book, _b) =>
                book.authors
                  ? book.authors.map((author, _a) => (
                      <option key={_b * 1000 + _a} value={author}>
                        {author}
                      </option>
                    ))
                  : ""
              )}
            </datalist>
          </div>

          <div className="input-group mx-2">
            <div className="input-group-append">
              <span className="input-group-icon mx-2">
                <Search
                  onClick={(event) => setFilterKey("category")}
                  size={"20px"}
                />
              </span>
            </div>
            <input
              type="text"
              list="categories"
              onChange={(event) => {
                setFilterKey("category");
                setFilterValue(event.target.value);
              }}
              placeholder="Search by category"
              className="form-control"
            />
            <datalist id="categories">
              {books.map((book, _b) =>
                book.categories
                  ? book.categories.map((category, _a) => (
                      <option key={_b * 1000 + _a} value={category}>
                        {category}
                      </option>
                    ))
                  : ""
              )}
            </datalist>
          </div>
        </div>
        {filteredBooks(filterKey, filterValue).map((book, index) => (
          <div className="card mb-2" key={index}>
            <div className="card-body">
              <div className="row">
                <div className="col col-lg-3 text-center">
                  {book.cover ? (
                    <img
                      src={book.cover.large}
                      style={{
                        width: "180px",
                        height: "238px",
                        borderRadius: "10px",
                      }}
                      alt=""
                    />
                  ) : (
                    <img
                      src="https://dummyimage.com/180x238/fff/000&text=image+not+available"
                      style={{
                        width: "180px",
                        height: "238px",
                        borderRadius: "10px",
                      }}
                      alt="not available"
                    />
                  )}
                </div>
                <div className="col" style={{ marginLeft: "10px" }}>
                  <div className="row mb-2">
                    <div className="col h3">{book.title}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <b>Authors</b>{" "}
                      <ul>
                        {book.authors.map((author, _a) => (
                          <li key={_a} style={{ marginLeft: "-5px" }}>
                            {author}{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col col-lg-3 col-sm-12">
                      <b>Pages:</b> {book.number_of_pages | "-"}
                    </div>
                    <div className="col col-lg-3 col-sm-12">
                      <b>Price:</b> ₹ {book.price}
                    </div>
                    <div className="col col-lg-3 col-sm-12">
                      <b>Ratings:</b> {book.rating}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <Link
                        to={`book/${book.book_id}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                      {book.in_cart ? (
                        ""
                      ) : (
                        <button
                          className="mx-2 btn btn-warning"
                          onClick={() => addToCart({ ...book, quantity: 1 })}
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
