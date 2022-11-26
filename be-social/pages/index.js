import { useState, useEffect, useContext } from "react";
import { withRouter } from "next/router";
// import Login from "../components/Home";
import Dashboard from "../components/Dashboard";
import Home from "../components/Home";
import firebase, { signInWithGoogle } from "../services/firebase";
import { UserContext } from "../context/userContext";

// import "./App.css";

function App() {
  let { user, setUser, signIn, logout } = useContext(UserContext);

  return (
    <div className="app">
      <button className="button" onClick={signIn}>
        Sign in with google
      </button>
      {user && (
        <p>
          <strong>{user.displayName}</strong>
        </p>
      )}
      <br></br>
      <button className="button" onClick={logout}>
        Logout
      </button>
      <br></br>
      <button className="button" onClick={() => {}}>
        Go to dashboard
      </button>
    </div>
  );
}

export default withRouter(App);
