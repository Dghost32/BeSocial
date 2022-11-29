import React, { useEffect, useContext } from "react";
// next
import { useRouter } from "next/router";
// context
import { UserContext } from "../../context/userContext";
// components
import AddDailyStatsForm from "../../components/Dashboard/Add/AddForm";
import Today from "../../components/Dashboard/Today";
import History from "../../components/Dashboard/History";
import { Button, Header, Tab, Container, Icon } from "semantic-ui-react";
import { Audio } from "react-loader-spinner";
import Analisys from "../../components/Dashboard/Analysis";
import Add from "../../components/Dashboard/Add";

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
      menuItem: "Add",
      render: () => (
        <Tab.Pane>
          <Add />
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
    {
      menuItem: "Analysis",
      render: () => (
        <Tab.Pane>
          <Analisys />
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
            <div className="flex flex-col align-center justify-space-between w-100">
              <Header
                as="h1"
                className="flex flex-col justify-center align-center"
              >
                <p className="flex">
                  Welcome to your
                  <p
                    style={{
                      color: "var(--accent-color)",
                    }}
                  >
                    &nbsp;Dashboard
                  </p>
                </p>
                &nbsp;{user.displayName.split(" ")[0]}
              </Header>

              <Button.Group>
                <Button animated secondary onClick={() => router.push("/")}>
                  <Button.Content visible color="blue">
                    Go back to main page
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow left" />
                  </Button.Content>
                </Button>
                <Button animated primary onClick={logout}>
                  <Button.Content visible color="blue">
                    Logout
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Button.Group>
            </div>
          </Container>

          <Container
            text
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
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
