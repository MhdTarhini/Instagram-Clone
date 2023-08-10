import React, { useState } from "react";
import Input from "../../components/input/input";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [data, setdata] = useState([
    {
      email: "",
      password: "",
    },
  ]);
  const handleDataChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handlesubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/guest/login",
        data
      );
      navigate("/home");
    } catch (err) {
      setError(true);
      setErrorContent(err.response.data.message);
    }
  };
  return (
    <div className="flex column center signin-container">
      <img src="/images.png" alt="" className="logo" />
      <div className="inputs flex column">
        <Input
          onchange={handleDataChange}
          label={"Mobile Number or Email"}
          name={"email"}
        />
        <Input
          onchange={handleDataChange}
          label={"Password"}
          name={"password"}
        />
      </div>
      <button className="button roundedMedium bold" onClick={handlesubmit}>
        login in
      </button>
      {error ? (
        <div className="error">{errorContent}</div>
      ) : (
        <div className="or">
          <span></span>OR<span></span>
        </div>
      )}
      <div className=" roundedMedium bold">Log in with facebook</div>
      <a href="#">Forgot passsword ?</a>
      <div className="have-account">
        Don't have an account? <a href="/register"> Sign up</a>
      </div>
    </div>
  );
}

export default Login;
