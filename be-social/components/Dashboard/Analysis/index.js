import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/userContext";
import { Header, Statistic, Icon } from "semantic-ui-react";
import { Audio } from "react-loader-spinner";
import {
  getAverage,
  getMax,
  getMin,
  getTotal,
  getBookEquivalent,
  getMovieEquivalent,
  getMilesEquivalent,
  getSongsEquivalent,
  getProgress,
} from "../../../utils/analysis";

const Analisys = () => {
  const { isUserLoggedIn, getUserStats, getUserName } = useContext(UserContext);

  const [userStats, setUserStats] = useState(null);
  const [userAnalysis, setUserAnalysis] = useState({});
  const [equivalent, setEquivalent] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [progressComparison, setProgressComparison] = useState({});

  const retrieveUserStats = async () => {
    setIsFetching(true);
    let u_stats = await getUserStats();
    setUserStats(u_stats);
    setIsFetching(false);
  };

  const getUserAnalysis = () => {
    let analysis = {
      total: getTotal(userStats?.dataset),
      average: getAverage(userStats?.dataset),
      max: getMax(userStats?.dataset),
      min: getMin(userStats?.dataset),
    };

    let equivalentTo = {
      books: {
        value: getBookEquivalent(analysis.total),
        label: "Books read",
        icon: "book",
      },
      movies: {
        value: getMovieEquivalent(analysis.total),
        label: "Movies watched",
        icon: "film",
      },
      series: {
        value: getMilesEquivalent(analysis.total),
        label: "Miles walked",
        icon: "male",
      },
      songs: {
        value: getSongsEquivalent(analysis.total),
        label: "Songs listened",
        icon: "music",
      },
    };

    let firstDay = userStats?.dataset[0];
    let lastDay = analysis.average;

    let progress = getProgress(firstDay, lastDay);

    setProgressComparison(progress);
    setEquivalent(equivalentTo);
    setUserAnalysis(analysis);
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      retrieveUserStats();
    }
  }, []);

  useEffect(() => {
    if (userStats && userStats?.labels?.length > 0) {
      getUserAnalysis();
    }
  }, [userStats]);

  return !isFetching ? (
    userStats?.labels?.length > 0 ? (
      <>
        <Header as="h3">Analysis of your stats</Header>

        {Object.keys(userAnalysis).length && (
          <>
            <p
              style={{
                fontSize: "1.3rem",
              }}
            >
              In{" "}
              <strong className="color-accent">
                {userStats?.labels.length} days
              </strong>
              &nbsp; you&apos;ve spent:
              <p style={{ fontSize: "0.7em" }}>
                <strong className="color-accent">In hours</strong>
              </p>
            </p>

            <Statistic.Group
              widths="two"
              size="small"
              style={{ margin: "2em 0" }}
            >
              {Object.keys(userAnalysis).map((key) => (
                <Statistic key={key}>
                  <Statistic.Value>{userAnalysis[key]}</Statistic.Value>
                  <Statistic.Label>{key}</Statistic.Label>
                </Statistic>
              ))}
            </Statistic.Group>
            <p style={{ fontSize: "1.3rem" }}>
              That&apos;s <strong className="color-accent">equivalent</strong>
              &nbsp;to
            </p>
            <Statistic.Group
              widths="two"
              size="small"
              style={{ margin: "2em 0" }}
            >
              {Object.keys(equivalent).map((key) => (
                <Statistic key={key}>
                  <Statistic.Value>
                    <Icon name={equivalent[key].icon} color="blue" />
                    &nbsp;
                    {equivalent[key].value}
                  </Statistic.Value>
                  <Statistic.Label>{equivalent[key].label}</Statistic.Label>
                </Statistic>
              ))}
            </Statistic.Group>

            <p
              style={{
                fontSize: "1.3rem",
              }}
            >
              By the time you arrived, you have
            </p>
            <div
              className="w-100 flex justify-center align-center"
              style={{
                fontSize: "2rem",
                marginBottom: "2em",
              }}
            >
              <Icon
                name={progressComparison.icon}
                size="huge"
                color={progressComparison.color}
              />
              <div>
                <strong>{progressComparison.label}</strong>
                <p style={{ fontSize: "0.7em" }}>
                  {progressComparison.description}
                  <strong style={{ display: "block" }} className="color-accent">
                    {progressComparison.label.toLowerCase() === "increased"
                      ? "Keep trying!"
                      : "Nice job!"}
                  </strong>
                </p>
              </div>
            </div>
            <p
              style={{
                fontSize: "1.3rem",
              }}
            >
              Your <strong className="color-accent">average</strong> usage time
              is
            </p>
            <div
              className="w-100 flex justify-center align-center"
              style={{
                fontSize: "2rem",
                marginBottom: "2em",
              }}
            >
              <Icon
                name={userAnalysis.average <= 3 ? "smile" : "frown"}
                size="huge"
                color={userAnalysis.average <= 3 ? "green" : "red"}
              />
              <div>
                <strong>{userAnalysis.average <= 3 ? "Below" : "Above"}</strong>
                <p style={{ fontSize: "0.7em" }}>
                  Global average
                  <strong style={{ display: "block" }} className="color-accent">
                    {userAnalysis.average <= 3
                      ? "Try to reduce it even more!"
                      : "Keep trying! "}
                  </strong>
                </p>
              </div>
            </div>

            <p style={{ fontSize: "0.8em" }}>
              <strong className="color-accent">Remember: </strong> you can
              always turn DND on!
            </p>
          </>
        )}
      </>
    ) : (
      <div
        className="flex flex-col justify-center align-center"
        style={{
          margin: "5em 0",
        }}
      >
        <Icon name="frown outline" size="huge" color="blue" />
        <Header as="h3">You don&apos;t have stats</Header>
        <p>Start by adding today&apos;s in the Add Daily Stats tab</p>
      </div>
    )
  ) : (
    <div className="flex flex-col justify-center align-center h-100 w-100">
      <Audio color="blue" />
      <Header as="h2">Retreaving your stats to analyse</Header>
    </div>
  );
};

export default Analisys;
