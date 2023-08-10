import React, { useEffect, useState } from "react";
import "./post.css";
import axios from "axios";

function Post({ id, image, content, user, likes, isLiked }) {
  const [userliked, setUserliked] = useState(isLiked);
  const [countLike, setCountLikes] = useState(likes);

  const handleLike = async () => {
    try {
      if (!userliked) {
        await axios.get(`http://127.0.0.1:8000/api/add_like/${id}`);
        setCountLikes(countLike + 1);
      } else {
        await axios.delete(`http://127.0.0.1:8000/api/remove_like/${id}`);
        setCountLikes(countLike - 1);
      }
      setUserliked(!userliked);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setUserliked(isLiked);
  }, [isLiked]);
  console.log(image);
  return (
    <div className="card flex column">
      <div className="user-profile flex pointer ">
        <img src="/3135715.png" alt="" srcset="" className="profile-image" />
        <div>{user.name}</div>
      </div>
      <img
        src={`http://127.0.0.1:8000/images/${image}`}
        alt=""
        className="post-image"
      />
      <div className="like flex ">
        <div className="flex center">
          <span>{countLike}</span>
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 1024 1024"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer"
            onClick={() => {
              handleLike();
            }}>
            <path
              d="M895.36 243.904a251.52 251.52 0 0 0-355.776 0l-20.096 20.096-20.096-20.096A251.52 251.52 0 0 0 143.616 599.68S466.24 926.72 512 928c14.336 0.384 86.4-59.52 164.224-128.192l-0.512-0.64a22.016 22.016 0 0 0-11.968-40.896 21.76 21.76 0 0 0-14.784 5.888l-0.064-0.064 62.336-56.832a22.08 22.08 0 0 0-7.808 16.704 22.4 22.4 0 0 0 22.4 22.464c5.44 0 10.24-2.176 14.208-5.44l0.256 0.32 50.048-45.76-0.448-0.448a22.08 22.08 0 0 0-16.768-36.992 21.952 21.952 0 0 0-14.656 5.824l80.384-73.472 0.512 0.512a22.08 22.08 0 0 0-5.696 14.592 22.4 22.4 0 0 0 22.4 22.464 22.016 22.016 0 0 0 14.272-5.504l0.32 0.384 24.832-23.168a251.776 251.776 0 0 0-0.128-355.84z"
              fill=""
            />
            <path
              d="M510.976 878.656c-51.008-33.344-207.168-180.416-335.488-310.528a206.976 206.976 0 0 1-0.192-292.544c39.04-39.104 91.008-60.608 146.24-60.608s107.136 21.504 146.176 60.544l51.84 51.84 51.84-51.776c39.04-39.04 90.944-60.544 146.176-60.544s107.2 21.504 146.176 60.544c39.04 39.04 60.544 90.944 60.544 146.24s-21.504 107.136-60.544 146.176c-140.096 131.776-301.76 276.032-352.768 310.656z"
              fill={userliked ? "#FF5F5F" : "#fcfcfc"}
            />
            <path
              d="M308.032 641.984a15.872 15.872 0 0 1-10.112-3.648 757.12 757.12 0 0 1-53.504-48.896 875.968 875.968 0 0 0-25.856-24.64C141.376 495.488 145.344 423.616 145.536 420.544 143.808 318.976 237.376 264.64 241.344 262.4a16 16 0 0 1 15.808 27.84c-0.832 0.448-81.088 47.488-79.744 131.2-0.064 3.648-2.368 61.248 62.528 119.552 8.704 7.808 17.536 16.448 26.816 25.536 15.616 15.36 31.808 31.168 51.328 47.104a15.936 15.936 0 1 1-10.048 28.352zM422.656 751.36a15.872 15.872 0 0 1-11.2-4.544l-61.312-60.032a16 16 0 1 1 22.4-22.912l61.312 60.032a16 16 0 0 1-11.2 27.456z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
        <div className="flex center">
          <span>7</span>
          <svg width="40px" height="40px" viewBox="0 0 32 32" version="1.1">
            <title>comment-1</title>
            <desc>Created with Sketch Beta.</desc>
            <defs></defs>
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd">
              <g
                id="Icon-Set"
                transform="translate(-100.000000, -255.000000)"
                fill="#000000">
                <path
                  d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z"
                  id="comment-1"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default Post;
