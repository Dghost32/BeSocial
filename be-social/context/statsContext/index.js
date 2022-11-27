import axios from "axios";
import { useState, createContext } from "react";
import firebase, { signInWithGoogle } from "../../services/firebase";
import Swal from "sweetalert2";

const StatsContext = createContext();

const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState(null);

  const getStats = async (user, date) => {
    if (!user) return 0;

    try {
      let res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/${user.email}${
          date ? `/${date}` : ""
        }`
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      return 0;
    }
  };

  const addStats = async (user, stats) => {
    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/${user.email}`,
        {
          stats,
        }
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StatsContext.Provider value={{ stats, getStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export { StatsContext, StatsProvider };
