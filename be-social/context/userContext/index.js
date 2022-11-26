import { useState, createContext } from "react";
import firebase, { signInWithGoogle } from "../../services/firebase";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  const isUserLoggedIn = () => {
    return user !== null;
  };

  const signIn = () => {
    return signInWithGoogle();
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isUserLoggedIn, signIn, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
