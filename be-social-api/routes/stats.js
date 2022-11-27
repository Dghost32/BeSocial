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
router.get("/", readAll);
router.get("/:email", readByUser);
router.get("/:email/:date", readByUserAndDate);
router.put("/", validator(updateOne));
router.delete("/", validator(deleteOne));

module.exports = router;
