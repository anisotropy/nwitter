import { useState, useEffect } from "react";
import Pages from "components/Pages";
import { auth } from "appFirebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [state, setState] = useState({
    isLoggedIn: false,
    isInitialized: false,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setState((prevState) => ({
          ...prevState,
          isLoggedIn: true,
          isInitialized: true,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          isLoggedIn: false,
          isInitialized: true,
        }));
      }
    });
  }, []);

  return (
    <>
      {state.isInitialized ? (
        <Pages isLoggedIn={state.isLoggedIn} user={user} />
      ) : (
        <div>Initializing...</div>
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
};

export default App;
