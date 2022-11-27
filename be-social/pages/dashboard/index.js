import React, { useEffect } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/userContext";
import AddDailyStatsForm from "../../components/Dashboard/AddDailyStatsForm";

const Dashboard = () => {
  let { user, isUserLoggedIn, logout } = useContext(UserContext);

  let router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push("/");
    }
  }, [user]);

  return (
    <div>
      <button onClick={logout}>logout</button>
      <button onClick={() => router.push("/")}>go back to main page</button>
      <p>Hello! {user?.displayName}</p>
      <p>Your email is {user?.email}</p>
      <AddDailyStatsForm />
    </div>
  );
};

export default Dashboard;
