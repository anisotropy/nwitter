import { useState, useEffect } from "react";
import Pages from "components/Pages";
import { getAuth, onChangeAuthState } from "appFb";

const App = () => {
  const auth = getAuth();
  const [state, setState] = useState({
    isLoggedIn: false,
    isInitialized: false,
  });

  useEffect(() => {
    onChangeAuthState(auth, (user) => {
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
  }, [auth]);

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
