import React, { useState, useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import { StatsContext } from "../../../../context/statsContext";
import { Input, Button, Label, Form, Icon } from "semantic-ui-react";

const AddForm = () => {
  const { user } = useContext(UserContext);
  const { addStats } = useContext(StatsContext);

  const [addingStats, setAddingStats] = useState(false);
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
    setAddingStats(true);
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
    setAddingStats(false);
  };

  const formElements = Object.keys(formData).map((key, index) => {
    return (
      <Form.Field key={`${key}-${index}`}>
        <Label
          as="a"
          htmlFor={key}
          type="number"
          color="blue"
          ribbon
          style={{
            minWidth: "100px",
            width: "20%",
            maxWidth: "500px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
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
    );
  });

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        margin: "0em 0",
      }}
    >
      {formElements}
      <Button
        animated="fade"
        // color="teal"
        type="submit"
        disabled={addingStats}
        style={{
          fontSize: "1.2em",
        }}
      >
        <Button.Content visible>Add Stats</Button.Content>
        <Button.Content hidden>
          <Icon name="send" />
        </Button.Content>
      </Button>
    </Form>
  );
};

export default AddForm;
