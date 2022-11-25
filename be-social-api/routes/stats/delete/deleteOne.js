const { db } = require("../../../db");
const {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} = require("firebase/firestore");

const deleteOne = async (req, res) => {
  const statsRef = collection(db, "stats");

  let { username, date } = req.body;

  if (!username || !date) {
    return res.status(400).json({
      message: "Username and date are required",
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
      await deleteDoc(doc(db, "stats", docId));
    } else {
      return res.status(400).json({
        message: "No stats found for this user on this date",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting stats",
    });
  }

  return res.status(200).json({
    message: "Stats deleted successfully",
  });
};

module.exports = deleteOne;
