import "../styles/globals.css";
// context providers
import { UserProvider } from "../context/userContext";
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
