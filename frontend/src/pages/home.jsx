import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/navbar/navbar";

function Home() {
  const { userData } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Home;
