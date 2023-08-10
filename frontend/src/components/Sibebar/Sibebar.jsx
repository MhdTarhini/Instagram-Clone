import React, { useContext, useEffect, useState } from "react";
import "./Sibebar.css";
import Modal from "react-modal";
import Input from "../input/input";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sibebar({ reloadPosts }) {
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

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };
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
      const filtereSearch = response.data.data.filter(
        (user) => user.id !== userData.id
      );
      setDataSearch(filtereSearch);
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
      reloadPosts();
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
  console.log(windowWidth);
  console.log(windowHeight);
  return (
    <>
      <div className="navbar flex column">
        <img src="/images.png" alt="" className="logo none-sm" />
        <div className="pointer flex center icon">
          <svg
            fill="#000000"
            width={windowWidth <= 700 ? "60" : "20"}
            height={windowWidth <= 700 ? "60" : "20"}
            // width="20px"
            // height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z" />
          </svg>
          <div className="none-sm">Home</div>
        </div>
        <div className="pointer flex center icon" onClick={openSearchModal}>
          <svg
            width={windowWidth <= 700 ? "60" : "20"}
            height={windowWidth <= 700 ? "60" : "20"}
            // width="20px"
            // height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="none-sm">Search</div>
        </div>
        <div className="pointer flex icon center none-sm">
          <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg">
            <title />
            <path d="M43,13H34.08l6.7-8.37a1,1,0,0,0-1.56-1.25L32,12.4l-7.22-9a1,1,0,0,0-1.56,1.25L29.92,13H21A13,13,0,0,0,8,26V48A13,13,0,0,0,21,61H43A13,13,0,0,0,56,48V26A13,13,0,0,0,43,13ZM54,48A11,11,0,0,1,43,59H21A11,11,0,0,1,10,48V26A11,11,0,0,1,21,15H43A11,11,0,0,1,54,26Z" />
            <path d="M42.35,34l-4.77,1.1a3.93,3.93,0,0,0,.06-2,4,4,0,0,0-4.79-3l-13,3A4,4,0,0,0,20.75,41a3.42,3.42,0,0,0,.9-.11l4.77-1.1a3.93,3.93,0,0,0-.06,2,4,4,0,0,0,3.89,3.11,4.25,4.25,0,0,0,.9-.11l13-3a4,4,0,0,0,3-4.8A4,4,0,0,0,42.35,34Zm2.59,5a2,2,0,0,1-1.24.89h0l-13,3a2.25,2.25,0,0,1-.47.06,2,2,0,0,1-.69-3.89,1,1,0,0,0-.36-1.93l-.23,0L21.15,39a1.56,1.56,0,0,1-.4,0,2,2,0,0,1-1.95-1.56,2,2,0,0,1,.25-1.5,2,2,0,0,1,1.25-.89l13-3a2,2,0,0,1,1.5.25,2,2,0,0,1-.35,3.57A1,1,0,0,0,35,37.78L42.8,36a2,2,0,0,1,2.14,3Z" />
          </svg>
          <div className="none-sm">Reels</div>
        </div>
        <div className="pointer flex icon center none-sm">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 10H16M8 14H16M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="none-sm">Messages</div>
        </div>
        <div className="pointer flex icon center none-sm">
          <svg
            width={windowWidth <= 700 ? "60" : "20"}
            height={windowWidth <= 700 ? "60" : "20"}
            viewBox="0 0 48 48"
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg">
            <path
              class="cls-1"
              d="M15.63,7.15A10.12,10.12,0,0,0,7.77,23.66h0L24,42.71,40.07,23.85l.08-.09.08-.1h0A10.13,10.13,0,1,0,24,11.58a10.1,10.1,0,0,0-8.36-4.43Z"
            />
          </svg>
          <div className="none-sm">Notifications</div>
        </div>
        <div className="pointer flex center icon" onClick={openModal}>
          <svg
            version="1.1"
            id="Uploaded to svgrepo.com"
            width={windowWidth <= 700 ? "60" : "20"}
            height={windowWidth <= 700 ? "60" : "20"}
            // width="20px"
            // height="20px"
            viewBox="0 0 32 32">
            <path
              class="bentblocks_een"
              d="M24,15v2h-7v7h-2v-7H8v-2h7V8h2v7H24z M24.485,24.485c-4.686,4.686-12.284,4.686-16.971,0
	c-4.686-4.686-4.686-12.284,0-16.971c4.687-4.686,12.284-4.686,16.971,0C29.172,12.201,29.172,19.799,24.485,24.485z M23.071,8.929
	c-3.842-3.842-10.167-3.975-14.142,0c-3.899,3.899-3.899,10.243,0,14.142c3.975,3.975,10.301,3.841,14.142,0
	C26.97,19.172,26.97,12.828,23.071,8.929z"
            />
          </svg>
          <div className="none-sm">Create</div>
        </div>
        <div className="user-profile flex pointer ">
          <img src="/3135715.png" alt="" srcset="" className="profile-image" />
          <div className="none-sm">{userData.name}</div>
        </div>
        <div className="logout pointer flex icon" onClick={handlelogout}>
          <svg
            width={windowWidth <= 700 ? "60" : "20"}
            height={windowWidth <= 700 ? "60" : "20"}
            viewBox="0 0 24 24"
            fill="none">
            <path
              d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="none-sm">logout</div>
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
      {/* <div className="pointer" onClick={openSearchModal}>
          Search
        </div> */}
      <Modal
        isOpen={isSearchModalOpen}
        onRequestClose={closeSearchModal}
        className="search-side"
        overlayClassName="overlay">
        <div className="search-model">
          <input
            type="search"
            name="search"
            id="search"
            onChange={handleSearchChange}
            placeholder="Search for users..."
          />
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
          <button onClick={closeSearchModal}>Cancel</button>
        </div>
      </Modal>
      {/* {openSearch ? (
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
      ) : null} */}
    </>
  );
}

export default Sibebar;
