const { db } = require("../../../db");
const { collection, getDocs } = require("firebase/firestore");
const { response } = require("../../../utils");

const readAll = async (req, res) => {
  const statsRef = collection(db, "stats");
  let status = 200;

  let stats = [];
  try {
    const statsSnapshot = await getDocs(statsRef);
    statsSnapshot.forEach((doc) => {
      stats.push(doc.data());
    });
  } catch (error) {
    response.message = "Error getting stats";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }
  response.message = "Stats retrieved successfully";
  response.data = stats;
  return res.status(status).json(response);
};

module.exports = readAll;
