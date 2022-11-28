// db connection file
const { db } = require("../../../db");
// firestore utilities
const {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} = require("firebase/firestore");
// local utilities
const { getDate, response } = require("../../../utils");

const createOne = async (req, res) => {
  const statsRef = collection(db, "stats");
  let status = 200;

  let { email } = req.params;
  let { stats } = req.body;
  let date = getDate();
  let totalUsage = 0;
  try {
    Object.keys(stats).forEach((key) => {
      totalUsage += Number(stats[key]);
    });
  } catch (error) {
    response.message = "Unvalid stat";
    response.error = error.message;
    status = 400;
    return res.status(status).json(response);
  }

  if (totalUsage > 24) {
    response.message = "Total usage cannot exceed 24 hours";
    status = 400;
    return res.status(status).json(response);
  }

  let toAdd = { email, stats, date, totalUsage };

  //check there's no record for today
  let q = query(
    statsRef,
    where("email", "==", email),
    where("date", "==", date)
  );
  const statsSnapshot = await getDocs(q);
  if (statsSnapshot.size > 0) {
    response.message = "Stats already added for today";
    status = 202;
    return res.status(status).json(response);
  }

  if (!email || !stats) {
    response.message = "Email and stats are required";
    status = 400;
    return res.status(status).json(response);
  }

  try {
    let firebaseResponse = await addDoc(statsRef, toAdd);

    if (!firebaseResponse.id) {
      response.message = "Error creating stats";
      status = 500;
      return res.status(status).json(response);
    }
  } catch (error) {
    response.message = "Error creating stats";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }

  response.message = "Stats created successfully";
  response.data = toAdd;
  status = 201;
  return res.status(status).json(response);
};

module.exports = createOne;
