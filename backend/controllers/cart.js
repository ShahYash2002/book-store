const pool = require("../connection");

exports.addToCart = async (req, res) => {
  try {
    const { email } = req.user;
    const { book_id, quantity } = req.body;

    const _cart = await pool.query(
      "insert into cart (user_id,book_id,quantity) values ((select user_id from users where email=$1),$2,$3)",
      [email, book_id, quantity]
    );

    if (_cart.rowCount > 0) {
      res.json("success");
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.getCart = async (req, res) => {
  try {
    const { email } = req.user;

    const _cart = await pool.query(
      "select cart.*,(select price from book where book_id=cart.book_id),(select title from book where book_id=cart.book_id),(select cover from book where book_id=cart.book_id) from cart where user_id=(select user_id from users where email=$1) order by quantity desc,book_id",
      [email]
    );
    const cart = _cart.rows;
    res.json(cart);
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateCart = async (req, res) => {
  try {
    const { email } = req.user;
    const { book_id } = req.params;
    const { quantity } = req.body;

    const _cart = await pool.query(
      "update cart set quantity=$3 where user_id=(select user_id from users where email=$1) and book_id=$2",
      [email, book_id, quantity]
    );
    res.json("success");
  } catch (error) {
    console.log(error.message);
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    const { email } = req.user;
    const { book_id } = req.params;

    const _cart = await pool.query(
      "delete from cart where book_id=$2 and user_id = (select user_id from users where email=$1)",
      [email, book_id]
    );

    res.json("success");
  } catch (error) {
    console.log(error.message);
  }
};
