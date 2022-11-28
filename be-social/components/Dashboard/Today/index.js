import React, { useEffect, useState, useContext } from "react";
// context
import { UserContext } from "../../../context/userContext";
import { StatsContext } from "../../../context/statsContext";
// components
import { Button, Header, Icon } from "semantic-ui-react";
import { Audio } from "react-loader-spinner";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Swal from "sweetalert2";

const History = () => {
  const { getUserEmail, getUserStatsByDay } = useContext(UserContext);
  const { deleteStatByDate } = useContext(StatsContext);
  const [userStats, setUserStats] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const retrieveUserStats = async () => {
    setIsFetching(true);
    let u_stats = await getUserStatsByDay("today");
    setUserStats(u_stats);
    setIsFetching(false);
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
      const deleted = await deleteStatByDate(getUserEmail(), "today");
      deleted && setUserStats(null);
    }
  };

  useEffect(() => {
    Chart.register(...registerables);
    retrieveUserStats();
  }, []);

  return (
    <div>
      {isFetching ? (
        <div className="flex flex-col justify-center align-center h-100 w-100">
          <Audio color="blue" />
          <Header as="h2">Retreaving your stats for today</Header>
        </div>
      ) : userStats?.labels?.length > 0 ? (
        <>
          <Header as="h3">Today Stats</Header>
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
          <Header as="h3" className="flex flex-row">
            Today you used your social media apps for: &nbsp;
            <p className="color-accent">{userStats.stat.totalUsage} Hours</p>
          </Header>

          <Button color="red" id="delete-stat" onClick={handleDelete}>
            Delete stats
          </Button>
        </>
      ) : (
        // if user has no stats for today
        <div
          className="flex flex-col justify-center align-center"
          style={{
            margin: "5em 0",
          }}
        >
          <Icon name="frown outline" size="huge" color="blue" />
          <Header as="h3">No stats for today</Header>
          <p>Try adding your stats in the Add Daily Stats tab</p>
        </div>
      )}
    </div>
  );
};

export default History;
