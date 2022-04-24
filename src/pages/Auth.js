import { useState } from "react";

const Auth = () => {
  const [state, setState] = useState({ email: "", password: "" });

  const onChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <form>
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
        <button type="submit">Login</button>
      </form>
      <button>Login with Google</button>
      <button>Login with GitHub</button>
    </div>
  );
};

export default Auth;
