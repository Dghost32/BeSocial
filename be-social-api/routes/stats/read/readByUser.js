const { db } = require("../../../db");
const { collection, getDocs, query, where } = require("firebase/firestore");
const { response } = require("../../../utils");

const readByUser = async (req, res) => {
  const statsRef = collection(db, "stats");
  let status = 200;

  let { email } = req.params;
  let stats = [];
  try {
    let q = query(statsRef, where("email", "==", email));
    const statsSnapshot = await getDocs(q);
    statsSnapshot.forEach((doc) => {
      stats.push(doc.data());
    });
  } catch (error) {
    response.message = "Error getting stats";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }

  if (!stats.length) {
    response.message = "No stats found";
    status = 404;
    return res.status(status).json(response);
  }

  let days = [];
  let dailyTotals = [];
  stats.forEach((stat) => {
    days.push(stat.date);
    dailyTotals.push(stat.totalUsage);
  });

  response.message = "Stats retrieved successfully";
  response.data = {
    stats,
    labels: days,
    dataset: dailyTotals,
  };

  return res.status(status).json(response);
};

module.exports = readByUser;
