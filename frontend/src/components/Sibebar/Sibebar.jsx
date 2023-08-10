import React, { useContext, useEffect, useState } from "react";
import "./Sibebar.css";
import Modal from "react-modal";
import Input from "../input/input";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sibebar() {
  const navigate = useNavigate();
  const { logout, userData } = useContext(AuthContext);
  const [isopen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [data, setdata] = useState([
    {
      image: "",
      content: "",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFollowing, setIsFollowing] = useState([]);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeSearch = () => {
    setOpenSearch(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/search_users?query=${searchQuery}`
      );
      setDataSearch(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataChange = (e) => {
    if (e.target.name === "image") {
      const imageFile = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        setdata({ ...data, image: base64Image });
      };

      reader.readAsDataURL(imageFile);
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handlelogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePost = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create_post",
        data
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const followUser = async (id) => {
    try {
      if (!isFollowing.includes(id)) {
        await axios.get(`http://127.0.0.1:8000/api/follow_user/${id}`);
      } else {
        await axios.get(`http://127.0.0.1:8000/api/follow_remove/${id}`);
      }
      GetFollowingUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const GetFollowingUsers = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get_user_following`
      );
      setIsFollowing(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
    GetFollowingUsers();
  }, [searchQuery]);

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };
  console.log(isFollowing);
  return (
    <>
      <div className="navbar flex column">
        <img src="/images.png" alt="" className="logo" />
        <input
          type="search"
          name="search"
          id="search"
          onChange={handleSearchChange}
          onClick={handleOpenSearch}
          placeholder="Search for users..."
        />
        <div className="pointer">Reels</div>
        <div className="pointer">Messages</div>
        <div className="pointer">Notifications</div>
        <div className="pointer" onClick={openModal}>
          Create
        </div>
        <div className="user-profile flex pointer ">
          <img src="/3135715.png" alt="" srcset="" className="profile-image" />
          <div>{userData.name}</div>
        </div>
        <div className="logout pointer" onClick={handlelogout}>
          logout
        </div>
        <Modal
          isOpen={isopen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay">
          <div className="create-model">
            <Input
              onchange={handleDataChange}
              label={"image"}
              name={"image"}
              type={"file"}
            />
            <Input
              onchange={handleDataChange}
              label={"content"}
              name={"content"}
              type={"text"}
            />
            <div className="buttons-container">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={handleSavePost}>Save</button>
            </div>
          </div>
        </Modal>
      </div>
      {openSearch ? (
        <div className="search-side">
          <div className="users-search">
            {dataSearch.map((user) => {
              return (
                <div className="users flex" key={user.id}>
                  <div className="flex center user">
                    <img
                      src="/3135715.png"
                      alt=""
                      srcset=""
                      className="profile-image"
                    />
                    <div>{user.name}</div>
                  </div>
                  <div
                    onClick={() => {
                      followUser(user.id);
                    }}>
                    {isFollowing.includes(user.id) ? (
                      <div className="pointer">followed</div>
                    ) : (
                      <div className="pointer">follow</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={closeSearch}>Cancel</button>
        </div>
      ) : null}
    </>
  );
}

export default Sibebar;
