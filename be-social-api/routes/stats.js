let express = require("express");
let router = express.Router();
let { validator } = require("../utils");

require("dotenv").config();

const readAll = require("./stats/read/readAll");
const readByUser = require("./stats/read/readByUser");
const readByUserAndDate = require("./stats/read/readByUserAndDate");
const updateOne = require("./stats/update/updateOne");
const createOne = require("./stats/create/createOne");
const deleteOne = require("./stats/delete/deleteOne");

router.post("/:email", validator(createOne));
router.get("/", validator(readAll));
router.get("/:email", validator(readByUser));
router.get("/:email/:date", validator(readByUserAndDate));
router.put("/", validator(updateOne));
router.delete("/:email/:date", validator(deleteOne));

module.exports = router;
