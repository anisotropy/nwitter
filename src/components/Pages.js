import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Auth from "pages/Auth";
import Navitation from "./Navigation";
import Profile from "pages/Profile";

const Pages = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navitation />}
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Pages;
