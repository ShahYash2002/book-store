const pool = require("../connection");

exports.addOrder = async (req, res) => {
  try {
    const { book_id, quantity, order_value } = req.body;
    const { email } = req.user;

    const _user = await pool.query("select * from users where email=$1", [
      email,
    ]);
    const { user_id } = _user.rows[0];

    const query = `insert into orders (book_id,user_id,quantity,order_value) values ($1,$2,$3,$4);`;

    const _order = await pool.query(query, [
      book_id,
      user_id,
      quantity,
      order_value,
    ]);
    res.json("success");
  } catch (error) {
    res.status(400).end();
    console.log(error.message);
  }
};
exports.getOrders = async (req, res) => {
  try {
    const { name, email } = req.user;
    const query = `select orders.*,(select title from book where book_id=orders.book_id),(select cover from book where book_id=orders.book_id) from orders where user_id=(select user_id from users where email=$1) order by order_date desc;`;
    const _orders = await pool.query(query, [email]);

    const orders = _orders.rows;
    // // console.log(orders);
    res.json(orders);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getOrderById = async (req, res) => {
  res.json({ msg: "get order for id" });
};
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.user;
    const query = `delete from orders where book_id=$1 and user_id=(select user_id from users where email=$2);`;
    const _result = await pool.query(query, [id, email]);
    res.json("success");
  } catch (error) {
    console.log(error.message);
  }
};
