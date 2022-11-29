const { db } = require("../../../db");
const { collection, getDocs } = require("firebase/firestore");
const { response } = require("../../../utils");

const readAll = async (req, res) => {
  const quotesRef = collection(db, "quotes");
  let status = 200;

  let quotes = [];
  try {
    const quotesSnapshot = await getDocs(quotesRef);
    quotesSnapshot.forEach((doc) => {
      quotes.push(doc.data());
    });
  } catch (error) {
    response.message = "Error getting quotes";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }
  response.message = "Quotes retrieved successfully";
  response.data = quotes;
  return res.status(status).json(response);
};

module.exports = readAll;
