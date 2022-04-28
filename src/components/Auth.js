import { auth } from "appFirebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "./AuthForm";

const Auth = () => {
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
      <AuthForm />
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
