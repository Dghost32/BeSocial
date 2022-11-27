let express = require("express");
let router = express.Router();
let login = require("./users/login");
let { validator } = require("../utils");

require("dotenv").config();

router.post("/login", validator(login));

module.exports = router;
