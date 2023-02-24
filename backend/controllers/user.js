const jwt = require("jsonwebtoken");

const pool = require("../connection");
const { JWT_SECRET } = require("../config");

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const _user = await pool.query("select * from users where email=$1", [
      email,
    ]);

    if (_user.rowCount != 1) {
      res.status(400).json("invalid credentials");
    }
    const user = _user.rows[0];
    if (password == user.password) {
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        JWT_SECRET
      );
      res.json({ token });
    } else {
      res.status(400).json("invalid credentials");
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.signup = [
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const existingUser = await pool.query(
        "select * from users where email=$1",
        [email]
      );

      if (existingUser.rowCount > 0) {
        return res.status(400).json("user already exists...");
      }
      next();
    } catch (error) {
      return res.status(500).json("unexpected error.");
    }
  },
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const _user = await pool.query(
        "insert into users (name,email,password) values ($1,$2,$3)",
        [name, email, password]
      );

      if (_user.rowCount === 1) {
        res.json("success");
      } else {
        return res.status(500).json("unexpected error.");
      }
    } catch (error) {
      return res.status(500).json("unexpected error.");
    }
  },
];
