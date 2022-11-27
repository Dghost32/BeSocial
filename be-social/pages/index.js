import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";

// import "./App.css";

function App() {
  let { user, isUserLoggedIn, login, logout } = useContext(UserContext);
  const router = useRouter();

  return (
    <div className="app">
      {isUserLoggedIn() ? (
        <>
          <p>
            <strong>{user.displayName}</strong>
          </p>
          <button className="button" onClick={logout}>
            Logout
          </button>
          <button
            className="button"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Go to dashboard
          </button>
        </>
      ) : (
        <>
          <button className="button" onClick={login}>
            SignIn with google
          </button>
        </>
      )}
    </div>
  );
}

export default App;
