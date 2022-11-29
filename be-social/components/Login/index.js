import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Button, Header } from "semantic-ui-react";

const Login = () => {
  const { login } = useContext(UserContext);
  return (
    <div className="app flex flex-col justify-center align-center h-full w-full">
      <Header as="h1">
        Welcome to Be
        <strong className="color-accent">Social</strong>
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
    </div>
  );
};

export default Login;
