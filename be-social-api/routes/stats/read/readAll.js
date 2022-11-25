const { db } = require("../../../db");
const { collection, getDocs } = require("firebase/firestore");

const readAll = async (req, res) => {
  const statsRef = collection(db, "stats");

  let stats = [];
  try {
    const statsSnapshot = await getDocs(statsRef);
    statsSnapshot.forEach((doc) => {
      stats.push(doc.data());
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting stats",
    });
  }
  return res.status(200).json({
    message: "Stats retrieved successfully",
    data: stats,
  });
};

module.exports = readAll;
