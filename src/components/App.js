import { useState } from "react";
import Pages from "components/Pages";
import { getAuth } from "appFb";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getAuth().currentUser);
  return (
    <>
      <Pages isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
};

export default App;
