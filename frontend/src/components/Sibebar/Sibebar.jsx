import React, { useState } from "react";
import "./Sibebar.css";

function Sibebar() {
  const [isopen, setIsOpen] = useState(false);
  return (
    <div className="navbar flex column">
      {isopen ? (
        <div>
          <div className="create-model">
            <input type="file" name="" id="" />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <img src="/images.png" alt="" className="logo" />
      <input type="search" name="search" id="search" />
      <div className="pointer">Reels</div>
      <div className="pointer">Messages</div>
      <div className="pointer">Notifications</div>
      <div
        className="pointer"
        onClick={() => {
          setIsOpen(!isopen);
        }}>
        Create
      </div>
      <div className="user-profile flex pointer ">
        <img src="/3135715.png" alt="" srcset="" className="profile-image" />
        <div>name</div>
      </div>
    </div>
  );
}

export default Sibebar;
