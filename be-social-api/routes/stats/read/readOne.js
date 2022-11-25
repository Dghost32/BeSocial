const { db } = require("../../../db");
const { collection, getDocs, query, where } = require("firebase/firestore");

const readOne = async (req, res) => {
  const statsRef = collection(db, "stats");

  let username = req.params.username;
  let stats = [];
  try {
    let q = query(statsRef, where("username", "==", username));
    const statsSnapshot = await getDocs(q);
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

module.exports = readOne;
