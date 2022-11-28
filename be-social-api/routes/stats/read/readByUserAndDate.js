const { db } = require("../../../db");
const { collection, getDocs, query, where } = require("firebase/firestore");
const { response } = require("../../../utils");

const readByUserAndDate = async (req, res) => {
  const statsRef = collection(db, "stats");
  let status = 200;
  let { email, date } = req.params;

  if (!email || !date) {
    response.message = "Email and date are required";
    status = 400;
    return res.status(status).json(response);
  }

  let stat;
  try {
    let q = query(
      statsRef,
      where("email", "==", email),
      where("date", "==", date)
    );
    const statsSnapshot = await getDocs(q);
    statsSnapshot.forEach((doc) => {
      stat = doc.data();
    });
  } catch (error) {
    response.message = "Error getting stats";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }

  if (!stat) {
    response.message = "No stats found";
    status = 404;
    return res.status(status).json(response);
  }

  labels = [];
  dataset = [];

  Object.keys(stat.stats).forEach((mediaApp) => {
    labels.push(mediaApp);
    dataset.push(stat.stats[mediaApp]);
  });

  response.message = "Stats retrieved successfully";
  response.data.stat = stat;
  response.data.labels = labels;
  response.data.dataset = dataset;
  return res.status(status).json(response);
};

module.exports = readByUserAndDate;
