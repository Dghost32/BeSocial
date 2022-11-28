import React, { useEffect, useContext } from "react";
// next
import { useRouter } from "next/router";
// context
import { UserContext } from "../../context/userContext";
// components
import AddDailyStatsForm from "../../components/Dashboard/AddStats";
import Today from "../../components/Dashboard/Today";
import History from "../../components/Dashboard/History";
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
      menuItem: "Today",
      render: () => (
        <Tab.Pane>
          <Today />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "History",
      render: () => (
        <Tab.Pane>
          <History />
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
            className="flex flex-col justify-center align-center"
            style={{
              display: "flex",
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
                  color: "var(--accent-color)",
                }}
              >
                &nbsp;Dashboard
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
          <Audio color="blue" />
        </div>
      )}
    </>
  );
};

export default Dashboard;
