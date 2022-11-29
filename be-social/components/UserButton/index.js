import React from "react";
import { UserContext } from "../../context/userContext";

const UserButton = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
      }}
    >
      {children}
    </div>
  );
};

export default UserButton;
