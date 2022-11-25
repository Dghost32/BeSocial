const { db } = require("../../../db");
const { collection, getDocs, query, where } = require("firebase/firestore");

const readByUserAndDate = async (req, res) => {
  const statsRef = collection(db, "stats");

  let { user, date } = req.params;

  if (!user || !date) {
    return res.status(400).json({
      message: "Missing user or date",
    });
  }

  let stat;
  try {
    let q = query(
      statsRef,
      where("username", "==", user),
      where("date", "==", date)
    );
    const statsSnapshot = await getDocs(q);
    statsSnapshot.forEach((doc) => {
      stat = doc.data();
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting stat",
    });
  }

  if (!stat) {
    return res.status(404).json({
      message: "Stat not found",
    });
  }

  return res.status(200).json({
    message: "Stat retrieved successfully",
    data: stat,
  });
};

module.exports = readByUserAndDate;
