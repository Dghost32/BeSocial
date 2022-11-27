import { useState, createContext } from "react";
// utilities
import axios from "axios";
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
    if (!user) return false;

    try {
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/${user.email}`,
        {
          stats,
          secret: process.env.NEXT_PUBLIC_API_SECRET,
        }
      );

      return Swal.fire({
        title: response.status,
        text: response.data.message,
        icon: "success",
      });
    } catch (err) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  return (
    <StatsContext.Provider value={{ stats, getStats, addStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export { StatsContext, StatsProvider };
