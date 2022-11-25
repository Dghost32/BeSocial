let express = require("express");
let router = express.Router();

const readAll = require("./stats/read/readAll");
const readOne = require("./stats/read/readOne");
const updateOne = require("./stats/update/updateOne");
const createOne = require("./stats/create/createOne");
const deleteOne = require("./stats/delete/deleteOne");

router.get("/", readAll);
router.get("/:username", readOne);
router.put("/", updateOne);
router.post("/", createOne);
router.delete("/", deleteOne);

module.exports = router;
