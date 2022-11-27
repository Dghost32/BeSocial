const { db } = require("../../../db");
const { collection, getDocs, query, where } = require("firebase/firestore");

const readByUser = async (req, res) => {
  const statsRef = collection(db, "stats");

  let { email } = req.params;
  let stats = [];
  try {
    let q = query(statsRef, where("email", "==", email));
    const statsSnapshot = await getDocs(q);
    statsSnapshot.forEach((doc) => {
      stats.push(doc.data());
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting stats",
    });
  }

  if (!stats.length) {
    return res.status(404).json({
      message: "Stats not found",
    });
  }

  return res.status(200).json({
    message: "Stats retrieved successfully",
    data: stats,
  });
};

module.exports = readByUser;
