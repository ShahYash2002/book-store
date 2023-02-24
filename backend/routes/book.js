const express = require("express");
const { setVisitorType } = require("../controllers/auth");
const router = express.Router();
const { getBooks, getBookById } = require("../controllers/book");

router.get("/", setVisitorType, getBooks);
router.get("/:id",setVisitorType, getBookById);

module.exports = router;
