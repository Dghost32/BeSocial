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
const { getDate } = require("../../../utils");

const createOne = async (req, res) => {
  const statsRef = collection(db, "stats");

  let { username, stats } = req.body;
  let date = getDate();
  let toAdd = { username, stats, date };

  //check there's no record for today
  let q = query(
    statsRef,
    where("username", "==", username),
    where("date", "==", date)
  );
  const statsSnapshot = await getDocs(q);
  if (statsSnapshot.size > 0) {
    return res.status(400).json({
      message: "Stats already added for today",
    });
  }

  if (!username || !stats) {
    return res.status(400).json({
      message: "Username and stats are required",
    });
  }

  try {
    let firebaseResponse = await addDoc(statsRef, toAdd);

    if (!firebaseResponse.id) {
      return res.status(500).json({
        message: "Error adding stats",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error adding stats",
    });
  }

  return res.status(200).json({
    message: "Stats added successfully",
    data: toAdd,
  });
};

module.exports = createOne;
