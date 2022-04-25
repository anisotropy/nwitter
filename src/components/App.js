import { useState, useEffect } from "react";
import Pages from "components/Pages";
import { auth } from "appFb";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [state, setState] = useState({
    isLoggedIn: false,
    isInitialized: false,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
        <Pages isLoggedIn={state.isLoggedIn} />
      ) : (
        <div>Initializing...</div>
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
};

export default App;
