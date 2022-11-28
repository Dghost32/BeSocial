const { db } = require("../../../db");
const { collection, getDocs } = require("firebase/firestore");
const { response } = require("../../../utils");

const readAll = async (req, res) => {
  const statsRef = collection(db, "stats");
  let status = 200;

  let stats = [];
  let average = 0;
  try {
    const statsSnapshot = await getDocs(statsRef);
    statsSnapshot.forEach((doc) => {
      stats.push(doc.data());
      average += doc.data().totalUsage;
    });

    average = average / stats.length;
  } catch (error) {
    response.message = "Error getting stats";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }
  response.response.message = "Stats retrieved successfully";
  response.data.stats = stats;
  response.data.average = average;
  return res.status(status).json(response);
};

module.exports = readAll;
