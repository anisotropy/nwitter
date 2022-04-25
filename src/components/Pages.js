import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import Navitation from "./Navigation";
import ProfilePage from "pages/ProfilePage";

const Pages = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navitation />}
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Pages;
