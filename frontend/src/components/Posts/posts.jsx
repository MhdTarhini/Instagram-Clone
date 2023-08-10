import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/post";
import "./posts.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";


function Posts({ Reload }) {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  const [postdata, SetPostData] = useState([]);
  const [isliked, setIsLiked] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get_Following_posts"
      );
      const PostsData = await response.data.data;
      SetPostData(PostsData.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  const fetchIsliked = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user_likes");
      setIsLiked(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPosts();
    fetchIsliked();
  }, [Reload]);
  return (
    <div className="card-container flex">
      {postdata.map((post) => {
        return (
          <Post
            id={post.id}
            content={post.content}
            image={post.image}
            user={post.users}
            likes={post.likes_count}
            isLiked={isliked.includes(post.id) ? true : false}
            key={post.id}
          />
        );
      })}
    </div>
  );
}

export default Posts;
