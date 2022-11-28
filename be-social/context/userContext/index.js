import { useState, createContext } from "react";
// firebase
import firebase, { signInWithGoogle } from "../../services/firebase";
// utilities
import axios from "axios";
import Swal from "sweetalert2";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  const getUserEmail = () => user.email;

  const isUserLoggedIn = () => user !== null;

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

      if (res.status === 200) {
        return Swal.fire({
          title: "You're logged in!",
          text: "Welcome back!",
          icon: "success",
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
        title: "You have been logged out",
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

  const getUserStats = async () => {
    try {
      let res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/${user.email}`
      );
      let data = res.data;
      return data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersStats = async () => {
    try {
      let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stats`);
      let data = res.data;
      return data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getUserStatsByDay = async (date) => {
    try {
      let res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/${user.email}/${date}`
      );
      let data = res.data;
      // console.log(data.data);
      return data.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isUserLoggedIn,
        login,
        logout,
        getUserStats,
        getUsersStats,
        getUserStatsByDay,
        getUserEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
