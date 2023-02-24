const pool = require("../connection");

exports.getBooks = async (req, res) => {
  try {
    const query = `select book_id,title,price,number_of_pages,rating,cover,(select string_agg(name,'|') from book_author where book_id=book.book_id) as authors,(select string_agg(name,'|') from book_category where book_id=book.book_id) as categories,(select count(*) > 0 from cart where book_id=book.book_id and user_id=(select user_id from users where email=$1)) as in_cart from book order by rating desc,publish_year desc`;
    const _books = await pool.query(query, [req.visitor.email]);

    console.log(req.visitor);
    if (_books.rowCount === 0) {
      return res.status(404).json("no books available");
    }

    let books = _books.rows;
    books.map((book) => {
      book.categories = book.categories ? book.categories.split("|") : null;
      book.authors = book.authors ? book.authors.split("|") : null;
      book.in_cart = req.visitor.email == null || book.in_cart;
    });
    res.json(books);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.visitor;
    const query = `select book.*,(select string_agg(name,'|') from book_author where book_id=book.book_id) as authors,(select string_agg(name,'|') from book_category where book_id=book.book_id) as categories,(select count(*) > 0 from orders where book_id=book.book_id and user_id=(select user_id from users where email=$2)) as has_ordered,(select count(*) > 0 from cart where book_id=book.book_id and user_id=(select user_id from users where email=$2)) as in_cart from book where book_id=$1`;
    const _books = await pool.query(query, [id, email]);

    if (_books.rowCount === 0) {
      return res.status(404).json("book not found");
    }

    let books = _books.rows;
    books.map((book) => {
      book.authors = book.authors ? book.authors.split("|") : null;
      book.categories = book.categories ? book.categories.split("|") : null;
      book.stock_status =
        book.quantity === 0
          ? "out of stock"
          : book.quantity <= 10
          ? "only few left"
          : "available";
    });

    res.json(...books);
  } catch (error) {
    console.log(error.message);
  }
};
