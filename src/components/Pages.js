import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import Navitation from "./Navigation";
import ProfilePage from "pages/ProfilePage";

const Pages = ({ isLoggedIn, user }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navitation />}
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
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
