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
        }
      );

      let success = Object.keys(response.data.data).length > 0;

      return Swal.fire({
        title: success ? "Great!" : "Don't worry",
        text: response.data.message,
        icon: success ? "success" : "warning",
      });
    } catch (err) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please check your stats and try again.",
      });
    }
  };

  const deleteStatByDate = async (email, date) => {
    try {
      let res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/${email}/${date}`
      );

      Swal.fire({
        title: "Great!",
        text: res.data.message,
        icon: "success",
      });
      return true;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
      return false;
    }
  };

  return (
    <StatsContext.Provider
      value={{ stats, getStats, addStats, deleteStatByDate }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export { StatsContext, StatsProvider };
