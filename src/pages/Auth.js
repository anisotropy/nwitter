import { signIn, signUp } from "appFb";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    isNewUser: true,
    error: "",
  });
  const auth = getAuth();

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
        await signUp.withEmailAndPw(auth, state.email, state.password);
      } else {
        await signIn.withEmailAndPw(auth, state.email, state.password);
      }
    } catch (error) {
      setState({ ...state, error: error.message });
    }
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
      <button>Login with Google</button>
      <button>Login with GitHub</button>
    </div>
  );
};

export default Auth;
