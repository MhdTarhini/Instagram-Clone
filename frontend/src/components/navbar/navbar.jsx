import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar flex column">
      <img src="/images.png" alt="" className="logo" />
      <input type="search" name="search" id="search" />
      <div className="pointer">Reels</div>
      <div className="pointer">Messages</div>
      <div className="pointer">Notifications</div>
      <div className="pointer">Create</div>
      <div className="user-profile flex pointer ">
        <img src="/3135715.png" alt="" srcset="" className="profile-image" />
        <div>name</div>
      </div>
    </div>
  );
}

export default Navbar;
