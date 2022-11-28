import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { StatsContext } from "../../../context/statsContext";
import { Input, Button, Label, Form } from "semantic-ui-react";

const AddDailyStatsForm = () => {
  const { user } = useContext(UserContext);
  const { addStats } = useContext(StatsContext);

  const [formData, setFormData] = useState({
    instagram: 0,
    facebook: 0,
    twitter: 0,
    youtube: 0,
    tiktok: 0,
    linkedin: 0,
    reddit: 0,
    twitch: 0,
    pinterest: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let stats = {};
      Object.keys(formData).map((key) => {
        if (formData[key]) {
          stats[key] = Number(formData[key]);
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
        <Form.Field>
          <Label for={key} type="number">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Label>
          <Input
            type="number"
            name={key}
            id={key}
            onChange={(e) => {
              setFormData({ ...formData, [key]: e.target.value });
            }}
          />
        </Form.Field>
      </>
    );
  });

  return (
    <Form onSubmit={handleSubmit}>
      {formElements}
      <Button
        secondary
        type="submit"
        style={{
          width: "100%",
        }}
      >
        submit
      </Button>
    </Form>
  );
};

export default AddDailyStatsForm;
