import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import { Button, Header, Icon } from "semantic-ui-react";

// import "./App.css";

function App() {
  let { user, isUserLoggedIn, login, logout } = useContext(UserContext);
  const router = useRouter();

  return (
    <div
      className="app"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      {isUserLoggedIn() ? (
        <div>
          <Header as="h1">Welcome! {user.displayName}</Header>

          <Button.Group style={{ width: "100%" }}>
            <Button animated primary onClick={logout}>
              <Button.Content visible color="blue">
                Logout
              </Button.Content>
              <Button.Content hidden>
                <Icon name="arrow left" />
              </Button.Content>
            </Button>

            <Button
              animated
              secondary
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <Button.Content visible color="blue">
                Go to dashboard
              </Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Button.Group>
        </div>
      ) : (
        <>
          <Header as="h1">Welcome to BeSocial</Header>
          <Button
            basic
            color="blue"
            icon="google"
            label={{
              as: "a",
              basic: true,
              color: "red",
              pointing: "left",
              content: "Sign Up With Google",
            }}
            onClick={login}
          />
        </>
      )}
    </div>
  );
}

export default App;
