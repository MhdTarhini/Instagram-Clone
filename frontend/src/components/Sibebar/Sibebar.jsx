import React, { useContext, useState } from "react";
import "./Sibebar.css";
import Modal from "react-modal";
import Input from "../input/input";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function Sibebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isopen, setIsOpen] = useState(false);
  const [data, setdata] = useState([
    {
      image: "",
      content: "",
    },
  ]);
  const handleDataChange = (e) => {
    if (e.target.name === "image") {
      setdata({ ...data, image: e.target.files[0] });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const handlelogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const handleSave = async () => {
    console.log(data);
    //   try {
    //     const response = await axios.post(
    //       "http://127.0.0.1:8000/api/create_post",
    //       data
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
  };
  return (
    <div className="navbar flex column">
      <img src="/images.png" alt="" className="logo" />
      <input type="search" name="search" id="search" />
      <div className="pointer">Reels</div>
      <div className="pointer">Messages</div>
      <div className="pointer">Notifications</div>
      <div className="pointer" onClick={openModal}>
        Create
      </div>
      <div className="user-profile flex pointer ">
        <img src="/3135715.png" alt="" srcset="" className="profile-image" />
        <div>name</div>
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
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Sibebar;
