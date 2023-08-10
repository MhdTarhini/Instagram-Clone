import React, { useEffect, useState } from "react";
import Post from "../Post/post";
import "./posts.css";
import axios from "axios";

function Posts() {
  const [postdata, SetPostData] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get_Following_posts"
      );
      SetPostData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(postdata);
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="card-container flex center">
      {postdata.map((post) => {
        return (
          <Post
            content={post.content}
            image={post.image}
            user={post.users}
            likes={post.likes_count}
          />
        );
      })}
      {/* <Post />
        <Post />
        <Post /> */}
    </div>
  );
}

export default Posts;
