const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const orderRouter = require("./routes/order");
const cartRouter = require("./routes/cart");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/", userRouter);
app.use("/book", bookRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRouter);

app.listen(5000, () => {
  console.log(`app is running at port 5000`);
});
