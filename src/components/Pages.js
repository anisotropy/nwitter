import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Auth from "pages/Auth";

const Pages = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
