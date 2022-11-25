var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    body: "stats get",
    data: [],
  });
});

module.exports = router;
