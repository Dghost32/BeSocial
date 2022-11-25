let express = require("express");
const { db } = require("../db");
const {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  doc,
} = require("firebase/firestore");
const { getDate } = require("../utils");

let router = express.Router();
const statsRef = collection(db, "stats");

//get stats from all users
router.get("/", async (req, res) => {
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
});

// get stats from a specific user
router.get("/:username", async (req, res) => {
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
});

// add stats for a specific user
router.post("/", async (req, res) => {
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
});

// delete stats for a specific user for a specific day
router.delete("/", async (req, res) => {
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
});

module.exports = router;
