import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Sibebar from "../../components/Sibebar/Sibebar";
import Posts from "../../components/Posts/posts";
import axios from "axios";
import "./home.css";

function Home() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  const [reloadPosts, setReloadPosts] = useState(false);

  const handleReloadPosts = () => {
    setReloadPosts(!reloadPosts);
  };
  return (
    <div className=" homepage">
      <Sibebar reloadPosts={handleReloadPosts} />
      <Posts Reload={reloadPosts} />
    </div>
  );
}

export default Home;
