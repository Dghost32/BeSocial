// db connection file
const { db } = require("../../../db");
// firestore utilities
const {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  getCountFromServer,
} = require("firebase/firestore");
let { response } = require("../../../utils");

const login = async (req, res) => {
  const usersRef = collection(db, "users");
  let status = 200;

  let { email, username } = req.body;

  if (!email || !username) {
    response.message = "Username and email are required";
    status = 400;
    return res.status(status).json(response);
  }

  try {
    let q = query(usersRef, where("email", "==", email));
    const usersSnapshot = await getDocs(q);
    const user = usersSnapshot.docs[0]?.data();

    response.message = "User logged in";
    response.data = user;

    if (usersSnapshot.size == 0) {
      //create user
      const docRef = await addDoc(usersRef, {
        email,
        username,
      });

      if (!docRef.id) {
        response.message = "Error creating user";
        status = 500;
        return res.status(status).json(response);
      }

      response.created = true;
      return res.status(status).json(response);
    }

    return res.status(status).json(response);
  } catch (error) {
    response.message = "Error getting users";
    response.error = error.message;
    status = 500;
    return res.status(status).json(response);
  }
};

module.exports = login;
