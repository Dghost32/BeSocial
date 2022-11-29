import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Button, Header } from "semantic-ui-react";
import Home from "../components/Home";
import Login from "../components/Login";

// import "./App.css";

function App() {
  let { isUserLoggedIn } = useContext(UserContext);

  return !isUserLoggedIn() ? <Login /> : <Home />;
}

export default App;
