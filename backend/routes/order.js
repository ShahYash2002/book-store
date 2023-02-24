const express = require("express");
const {
  getOrders,
  getOrderById,
  addOrder,
  cancelOrder,
} = require("../controllers/order");

const { auth } = require("../controllers/auth");
const router = express.Router();

router.get("/", auth, getOrders);
router.get("/:id", auth, getOrderById);
router.post("/", auth, addOrder);
router.delete("/:id", auth, cancelOrder);
module.exports = router;
