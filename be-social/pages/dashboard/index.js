import React, { useEffect, useContext } from "react";
// next
import { useRouter } from "next/router";
// context
import { UserContext } from "../../context/userContext";
// components
import AddDailyStatsForm from "../../components/Dashboard/AddDailyStatsForm";
import UserGraphs from "../../components/Dashboard/UserGraphs";
import { Button, Header, Tab, Container, Icon } from "semantic-ui-react";
import { Audio } from "react-loader-spinner";

const Dashboard = () => {
  let { user, isUserLoggedIn, logout } = useContext(UserContext);

  let router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push("/");
    }
  }, [user]);

  const panes = [
    {
      menuItem: "Add Daily Stats",
      render: () => (
        <Tab.Pane>
          <AddDailyStatsForm />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "View Graphs",
      render: () => (
        <Tab.Pane>
          <UserGraphs />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {user ? (
        <>
          <Container
            text
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "2rem",
            }}
          >
            <Header
              as="h1"
              style={{
                margin: "auto",
                display: "flex",
              }}
            >
              Welcome to your
              <p
                style={{
                  color: "blue",
                }}
              >
                &nbsp;DASHBOARD
              </p>
              !
            </Header>

            <Header as="h4" style={{ margin: "auto", marginBottom: "1em" }}>
              {user.displayName}
            </Header>

            <Button.Group style={{ width: "100%" }}>
              <Button animated primary onClick={logout}>
                <Button.Content visible color="blue">
                  Logout
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
              <Button animated secondary onClick={() => router.push("/")}>
                <Button.Content visible color="blue">
                  Go back to main page
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Button.Group>
          </Container>

          <Container
            text
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Tab panes={panes} />
          </Container>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Audio />
        </div>
      )}
    </>
  );
};

export default Dashboard;
