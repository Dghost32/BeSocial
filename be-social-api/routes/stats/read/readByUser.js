const { db } = require("../../../db");
const { collection, getDocs, query, where } = require("firebase/firestore");
const { response, sortObjectBy } = require("../../../utils");

const readByUser = async (req, res) => {
  const statsRef = collection(db, "stats");
  let status = 200;

  let { email } = req.params;
  let stats = [];
  let average = 0;
  try {
    let q = query(statsRef, where("email", "==", email));
    const statsSnapshot = await getDocs(q);
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

  if (!stats.length) {
    response.message = "No stats found";
    status = 200;
    return res.status(status).json(response);
  }

  let days = [];
  let dailyTotals = [];

  sortObjectBy(stats, "date");

  stats.forEach((stat) => {
    days.push(stat.date);
    dailyTotals.push(stat.totalUsage);
  });

  response.message = "Stats retrieved successfully";
  response.data = {
    stats,
    average,
    labels: days,
    dataset: dailyTotals,
  };

  return res.status(status).json(response);
};

module.exports = readByUser;
