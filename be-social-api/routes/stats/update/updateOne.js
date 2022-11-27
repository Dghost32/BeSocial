const { db } = require("../../../db");
const {
  collection,
  getDocs,
  updateDoc,
  query,
  where,
  doc,
} = require("firebase/firestore");
let { response } = require("../../../utils");

const updateOne = async (req, res) => {
  const statsRef = collection(db, "stats");
  let status = 200;

  let { username, stats, date } = req.body;

  if (!username || !stats || !date) {
    response.message = "Username, stats, and date are required";
    status = 400;
    return res.status(status).json(response);
  }

  try {
    let q = query(
      statsRef,
      where("username", "==", username),
      where("date", "==", date)
    );
    const statsSnapshot = await getDocs(q);

    if (!statsSnapshot.size > 0) {
      response.message = "No stats found";
      status = 404;
      return res.status(status).json(response);
    }

    let docId = statsSnapshot.docs[0].id;
    await updateDoc(doc(db, "stats", docId), { stats });

    response.message = "Stats updated successfully";
    response.data.old = statsSnapshot.docs[0].data();
    response.data.new = stats;
    return res.status(status).json(response);
  } catch (error) {
    response.message = "Error updating stats";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }
};

module.exports = updateOne;
