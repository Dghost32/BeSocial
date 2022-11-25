const { db } = require("../../../db");
const {
  collection,
  getDocs,
  updateDoc,
  query,
  where,
  doc,
} = require("firebase/firestore");

const updateOne = async (req, res) => {
  const statsRef = collection(db, "stats");

  let { username, stats, date } = req.body;

  if (!username || !stats || !date) {
    return res.status(400).json({
      message: "Username, stats and date are required",
    });
  }

  let q = query(
    statsRef,
    where("username", "==", username),
    where("date", "==", date)
  );

  try {
    const statsSnapshot = await getDocs(q);
    if (statsSnapshot.size > 0) {
      let docId = statsSnapshot.docs[0].id;
      await updateDoc(doc(db, "stats", docId), { stats });
    } else {
      return res.status(400).json({
        message: "No stats found for this user on this date",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error updating stats",
    });
  }

  return res.status(200).json({
    message: "Stats updated successfully",
  });
};

module.exports = updateOne;
