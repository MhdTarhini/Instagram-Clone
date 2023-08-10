import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Home() {
  const { userData, userToken } = useContext(AuthContext);
  console.log(userData);
  return <div>home</div>;
}

export default Home;
