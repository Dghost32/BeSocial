import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Dropdown, Form, Header, Label } from "semantic-ui-react";
import { Audio } from "react-loader-spinner";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const UserGraphs = () => {
  const { getUserStats, getUserStatsByDay } = useContext(UserContext);
  const [userStats, setUserStats] = useState(null);
  const [statsByDay, setStatsByDay] = useState(null);
  const [userDays, setUserDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const retrieveUserStats = async () => {
    let u_stats = await getUserStats();
    setUserStats(u_stats);
  };

  const retrieveUserStatsByDay = async (day) => {
    let user_stats_by_day = await getUserStatsByDay(day);
    setStatsByDay(user_stats_by_day);
  };

  const getDaysOptions = () => {
    let days = userStats.labels.map((label) => {
      return { key: label, value: label, text: label };
    });

    setUserDays(days);
  };

  const handleDayChange = (e, { value }) => {
    setSelectedDay(value);
  };

  useEffect(() => {
    Chart.register(...registerables);
    retrieveUserStats();
  }, []);

  useEffect(() => {
    if (userStats) {
      getDaysOptions();
    }
  }, [userStats]);

  useEffect(() => {
    if (selectedDay) {
      retrieveUserStatsByDay(selectedDay);
    }
  }, [selectedDay]);

  return (
    <div>
      {!userStats ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Audio />
        </div>
      ) : (
        <>
          <Header as="h3">Your Stats</Header>
          <Bar
            datasetIdKey="user_stats"
            data={{
              labels: userStats.labels,
              datasets: [
                {
                  id: "user",
                  label: "Daily usage",
                  data: userStats.dataset,
                },
              ],
            }}
          />
          <Header as="h3">Get usage of a specific day</Header>
          <Form>
            <Form.Field>
              <Label for="date">Select a date</Label>
              <Dropdown
                placeholder="Select a date"
                fluid
                selection
                options={userDays}
                onChange={handleDayChange}
              />
            </Form.Field>
          </Form>
          {statsByDay && (
            <>
              <Header as="h3">Stats of a day</Header>
              <Bar
                datasetIdKey="user_stats_by_day"
                data={{
                  labels: statsByDay.labels,
                  datasets: [
                    {
                      id: "user",
                      label: "Daily usage",
                      data: statsByDay.dataset,
                    },
                  ],
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserGraphs;
