let express = require("express");
let { validator } = require("../utils");

require("dotenv").config();

let router = express.Router();

const readAll = require("./quotes/read/readAll");

router.get("/", validator(readAll));

module.exports = router;
