const Pool = require("pg").Pool;
const { db } = require("./config");

const pool = new Pool(db);

module.exports = pool;
