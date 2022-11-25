let express = require("express");
let router = express.Router();

require("dotenv").config();

const readAll = require("./stats/read/readAll");
const readByUser = require("./stats/read/readByUser");
const readByUserAndDate = require("./stats/read/readByUserAndDate");
const updateOne = require("./stats/update/updateOne");
const createOne = require("./stats/create/createOne");
const deleteOne = require("./stats/delete/deleteOne");

const validator = (fn) => (req, res) => {
  if (req.body.secret !== process.env.API_PASS) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  return fn(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({
      message: "Error",
    });
  });
};

router.post("/", createOne);
router.get("/", readAll);
router.get("/:user", readByUser);
router.get("/:user/:date", readByUserAndDate);
router.put("/", validator(updateOne));
router.delete("/", validator(deleteOne));

module.exports = router;
