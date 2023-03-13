const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.auth = (req, res, next) => {
  try {
    const [Bearer, token] = req.headers.authorization.split(" ");
    const user = jwt.verify(token, JWT_SECRET);

    if (!user) {
      return res.status(400).json("authentication failed");
    }

    // console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json("authentication failed");
  }
};

exports.setVisitorType = (req, res, next) => {
  try {
    const [Bearer, token] = req.headers.authorization.split(" ");
    const user = jwt.verify(token, JWT_SECRET);
    req.visitor = user;
  } catch (error) {
    req.visitor = {
      name: "guest",
      email: null,
    };
  } finally {
    next();
  }
};
