import { signIn, signUp } from "appFb";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    isNewUser: true,
  });
  const auth = getAuth();

  const onChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let userCredential;
      if (state.isNewUser) {
        userCredential = await signUp.withEmailAndPw(
          auth,
          state.email,
          state.password
        );
      } else {
        userCredential = await signIn.withEmailAndPw(
          auth,
          state.email,
          state.password
        );
      }
      console.log(userCredential);
    } catch (error) {
      console.log(error);
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
        <button type="submit">{state.isNewUser ? "Sign up" : "Sign in"}</button>
      </form>
      <button>Login with Google</button>
      <button>Login with GitHub</button>
    </div>
  );
};

export default Auth;
