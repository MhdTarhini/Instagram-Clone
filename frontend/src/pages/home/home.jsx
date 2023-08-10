import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Navbar from "../../components/navbar/navbar";
import Posts from "../../components/Posts/posts";
import axios from "axios";

function Home() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  return (
    <div className="flex">
      <Navbar />
      <Posts />
    </div>
  );
}

export default Home;
