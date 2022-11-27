import "../styles/globals.css";
import { UserProvider } from "../context/userContext/index.js";
import { StatsProvider } from "../context/statsContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StatsProvider>
        <Component {...pageProps} />
      </StatsProvider>
    </UserProvider>
  );
}

export default MyApp;
