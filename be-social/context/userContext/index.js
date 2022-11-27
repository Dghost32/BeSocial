import axios from "axios";
import { useState, createContext } from "react";
import firebase, { signInWithGoogle } from "../../services/firebase";
import Swal from "sweetalert2";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  const isUserLoggedIn = () => {
    return user !== null;
  };

  const login = async () => {
    try {
      let result = await signInWithGoogle();
      let user = result.user;

      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          username: user.displayName,
          email: user.email,
          secret: process.env.NEXT_PUBLIC_API_SECRET,
        }
      );

      let data = res.data;

      if (res.status === 200) {
        return Swal.fire({
          icon: "success",
          title: "Login Success",
          text: data.created ? "Glad you're here!" : "Welcome back!",
        });
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      logout();
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();

      return Swal.fire({
        icon: "success",
        title: "Logout Success",
        text: "See you soon!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, isUserLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
