import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/register";
import "./utilities.css";
import Login from "./pages/login/login";
import { AuthContextProvider } from "./context/authContext";
import Home from "./pages/home/home";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
