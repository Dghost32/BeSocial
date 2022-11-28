const { db } = require("../../../db");
const {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} = require("firebase/firestore");
const { response, getDate } = require("../../../utils");

const deleteOne = async (req, res) => {
  const statsRef = collection(db, "stats");
  let status = 200;

  let { email, date } = req.params;

  if (date === "today") {
    date = getDate();
  }

  if (!email || !date) {
    response.message = "email and date are required";
    status = 400;
    return res.status(status).json(response);
  }

  try {
    let q = query(
      statsRef,
      where("email", "==", email),
      where("date", "==", date)
    );

    const statsSnapshot = await getDocs(q);

    if (!statsSnapshot.size > 0) {
      response.message = "No stats found";
      status = 404;
      return res.status(status).json(response);
    }

    let docId = statsSnapshot.docs[0].id;
    await deleteDoc(doc(db, "stats", docId));

    response.message = "Stats deleted successfully";
    response.data = statsSnapshot.docs[0].data();
    return res.status(status).json(response);
  } catch (error) {
    response.message = "Error deleting stats";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }
};

module.exports = deleteOne;
