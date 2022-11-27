import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import Swal from "sweetalert2";

const AddDailyStatsForm = () => {
  let { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    instagram: 0,
    facebook: 0,
    twitter: 0,
    youtube: 0,
    tiktok: 0,
    snapchat: 0,
    pinterest: 0,
    linkedin: 0,
    reddit: 0,
    twitch: 0,
  });

  const add = async (e) => {
    e.preventDefault();
    try {
      let stats = {};
      Object.keys(formData).map((key) => {
        if (formData[key] !== 0) {
          stats[key] = formData[key];
        }
      });
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/${user.email}`,
        {
          stats,
          secret: process.env.NEXT_PUBLIC_API_SECRET,
        }
      );

      return Swal.fire({
        icon: "success",
        title: res.status,
        text: res.data.message,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
      });
    }
  };

  const formElements = Object.keys(formData).map((key) => {
    return (
      <>
        <div>
          <label htmlFor={key}>{key}</label>
          <input
            type="number"
            name={key}
            id={key}
            onChange={(e) => {
              setFormData({ ...formData, [key]: e.target.value });
            }}
          />
        </div>
      </>
    );
  });

  return (
    <form onSubmit={add}>
      {formElements} <button type="submit">submit</button>
    </form>
  );
};

export default AddDailyStatsForm;
