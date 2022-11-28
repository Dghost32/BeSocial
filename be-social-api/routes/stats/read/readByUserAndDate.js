const { db } = require("../../../db");
const { collection, getDocs, query, where } = require("firebase/firestore");
const { response, getDate, capitalizeFirstLetter } = require("../../../utils");

const readByUserAndDate = async (req, res) => {
  const statsRef = collection(db, "stats");
  let status = 200;
  let { email, date } = req.params;

  if (date == "today") {
    console.log("today");
    date = getDate();
  }

  if (!email || !date) {
    response.data = {};
    response.message = "Email and date are required";
    status = 400;
    return res.status(status).json(response);
  }

  let stat = null;
  try {
    let q = query(
      statsRef,
      where("email", "==", email),
      where("date", "==", date)
    );
    const statsSnapshot = await getDocs(q);
    stat = statsSnapshot.docs[0]?.data();
  } catch (error) {
    response.message = "Error getting stats";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }

  if (!stat) {
    response.message = "No stats found";
    response.data.stat = {};
    response.data.labels = [];
    response.data.dataset = [];
    status = 200;
    return res.status(status).json(response);
  }

  let labels = [];
  let dataset = [];

  Object.keys(stat.stats).forEach((mediaApp) => {
    labels.push(mediaApp);
    dataset.push(stat.stats[mediaApp]);
  });

  labels = labels.map((label) => capitalizeFirstLetter(label));

  response.message = "Stats retrieved successfully";
  response.data = {
    stat,
    labels,
    dataset,
  };

  delete response.data.stat.stats;
  return res.status(status).json(response);
};

module.exports = readByUserAndDate;
