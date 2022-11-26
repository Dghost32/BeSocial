import React, { useState, useEffect } from "react";

import { auth } from "../../services/firebase";

// import "../App.css";

const Dashboard = ({ user }) => {
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="home">
      <h1>
        Hello, <span></span>
        {user.displayName}
      </h1>
      {/* <img src={user.photoURL} alt="" /> */}
      <button className="button signout" onClick={() => auth.signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
