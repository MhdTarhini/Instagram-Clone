import React from "react";
import Post from "../Post/post";
import "./posts.css";

function Posts() {
  return (
    <div>
      <div className="card-container flex center">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Posts;
