import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { StatsContext } from "../../../context/statsContext";
import Swal from "sweetalert2";

const AddDailyStatsForm = () => {
  const { user } = useContext(UserContext);
  const { addStats } = useContext(StatsContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let stats = {};
      Object.keys(formData).map((key) => {
        if (formData[key] !== 0) {
          stats[key] = formData[key];
        }
      });

      await addStats(user, stats);
    } catch (err) {
      console.log(err);
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
    <form onSubmit={handleSubmit}>
      {formElements} <button type="submit">submit</button>
    </form>
  );
};

export default AddDailyStatsForm;
