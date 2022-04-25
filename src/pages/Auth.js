import { auth } from "appFb";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    isNewUser: true,
    error: "",
  });

  const onChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onToggle = () => {
    setState((prevState) => ({
      ...prevState,
      isNewUser: !prevState.isNewUser,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (state.isNewUser) {
        await createUserWithEmailAndPassword(auth, state.email, state.password);
      } else {
        await signInWithEmailAndPassword(auth, state.email, state.password);
      }
    } catch (error) {
      setState({ ...state, error: error.message });
    }
  };

  const onSocialLogin = async (event) => {
    let provider;
    if (event.target.name === "google") {
      provider = new GoogleAuthProvider();
    } else if (event.target.name === "github") {
      provider = new GithubAuthProvider();
    }
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          value={state.email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={onChange}
        />
        <button type="submit">
          {state.isNewUser ? "Sign up with Email" : "Log in with Email"}
        </button>
        <label>
          <input
            type="checkbox"
            checked={state.isNewUser}
            onChange={onToggle}
          />
          Sign up
        </label>
      </form>
      {state.error && <p>{state.error}</p>}
      <button name="google" onClick={onSocialLogin}>
        Login with Google
      </button>
      <button name="github" onClick={onSocialLogin}>
        Login with GitHub
      </button>
    </div>
  );
};

export default Auth;
