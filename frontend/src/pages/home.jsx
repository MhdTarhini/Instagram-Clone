import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/navbar/navbar";
import Posts from "../components/Posts/posts";

function Home() {
  const { userData } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <Posts />
    </div>
  );
}

export default Home;
