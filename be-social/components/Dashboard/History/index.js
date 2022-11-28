import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { StatsContext } from "../../../context/statsContext";
import { Dropdown, Form, Header, Label, Icon, Button } from "semantic-ui-react";
import { Audio } from "react-loader-spinner";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Swal from "sweetalert2";

const History = () => {
  const { getUserStats, getUserStatsByDay, getUserEmail } =
    useContext(UserContext);
  const { deleteStatByDate } = useContext(StatsContext);

  const [userStats, setUserStats] = useState(null);
  const [statsByDay, setStatsByDay] = useState(null);
  const [userDays, setUserDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const retrieveUserStats = async () => {
    setIsFetching(true);
    let u_stats = await getUserStats();
    setUserStats(u_stats);
    setIsFetching(false);
  };

  const retrieveUserStatsByDay = async (day) => {
    let user_stats_by_day = await getUserStatsByDay(day);
    setStatsByDay(user_stats_by_day);
  };

  const getDaysOptions = () => {
    let days = userStats.labels?.map((label) => {
      return { key: label, value: label, text: label };
    });

    setUserDays(days);
  };

  const handleDayChange = (e, { value }) => {
    setSelectedDay(value);
  };

  const handleDelete = async () => {
    let confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (confirmation.isConfirmed) {
      const deleted = await deleteStatByDate(getUserEmail(), selectedDay);
      if (deleted) {
        setSelectedDay(null);
        setStatsByDay(null);
        await retrieveUserStats();
      }
    }
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
      {isFetching ? (
        <div className="flex flex-col justify-center align-center h-100 w-100">
          <Audio color="blue" />
          <Header as="h2">Retreaving all your stats</Header>
        </div>
      ) : userStats?.labels?.length ? (
        <>
          <Header as="h3">Your History</Header>
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
              <Header as="h4">Stats of a day</Header>
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
              <Header as="h4" className="flex">
                That day you used social you used your social media apps for:
                &nbsp;
                <p className="color-accent">
                  {statsByDay.stat.totalUsage} Hours
                </p>
              </Header>
              <Button color="red" id="delete-stat" onClick={handleDelete}>
                Delete stats
              </Button>
            </>
          )}
        </> // if user has no stats for today
      ) : (
        <div
          className="flex flex-col justify-center align-center"
          style={{
            margin: "5em 0",
          }}
        >
          <Icon name="frown outline" size="huge" color="blue" />
          <Header as="h3">You have no stats</Header>
          <p>Start by adding today&apos;s in the Add Daily Stats tab</p>
        </div>
      )}
    </div>
  );
};

export default History;
