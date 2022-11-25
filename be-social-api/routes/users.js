let express = require("express");
const { db } = require("../db");
const { getDocs, collection } = require("firebase/firestore");

let router = express.Router();
const usersRef = collection(db, "users");

//

module.exports = router;
