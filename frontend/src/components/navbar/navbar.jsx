import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar flex">
      <img src="/images.png" alt="" className="logo" />
      <div>
        <input type="search" name="search" id="search" />
      </div>
      <div className="user-profile flex center">
        <img src="/3135715.png" alt="" srcset="" />
        <div>name</div>
      </div>
    </div>
  );
}

export default Navbar;
