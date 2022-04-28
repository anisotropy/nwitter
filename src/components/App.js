import { useState, useEffect, useCallback } from "react";
import Pages from "components/Pages";
import { auth } from "appFirebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [state, setState] = useState({
    user: null,
    isLoggedIn: false,
    isInitialized: false,
  });

  const createUser = useCallback(
    () => ({
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      update: () => {
        setState((prev) => ({ ...prev, user: createUser() }));
      },
    }),
    []
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setState((prevState) => ({
          ...prevState,
          user: createUser(),
          isLoggedIn: true,
          isInitialized: true,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          user: null,
          isLoggedIn: false,
          isInitialized: true,
        }));
      }
    });
  }, [createUser]);

  return (
    <>
      {state.isInitialized ? (
        <Pages isLoggedIn={state.isLoggedIn} user={state.user} />
      ) : (
        <div>Initializing...</div>
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
};

export default App;
