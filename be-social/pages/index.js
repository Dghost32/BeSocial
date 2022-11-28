import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import { Button, Header, Icon } from "semantic-ui-react";

// import "./App.css";

function App() {
  let { user, isUserLoggedIn, login, logout } = useContext(UserContext);
  const router = useRouter();

  return (
    <div className="app flex flex-col justify-center align-center h-full w-full">
      {isUserLoggedIn() ? (
        <div>
          <Header as="h1">Welcome! {user.displayName}</Header>

          <Button.Group className="w-100">
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
          <Header as="h1" className="flex flex-row align-center justify-center">
            Welcome to Be
            <p className="color-accent">Social</p>
          </Header>
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
