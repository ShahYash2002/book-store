const express = require("express");
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cart");
const { auth } = require("../controllers/auth");
const router = express.Router();

router.get("/", auth, getCart);
router.post("/", auth, addToCart);
router.put("/:book_id", auth, updateCart);
router.delete("/:book_id", auth, removeFromCart);

module.exports = router;
