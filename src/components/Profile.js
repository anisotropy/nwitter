import { auth } from "appFirebase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const onLogout = async () => {
    await signOut(auth);
  };
  return (
    <>
      <button onClick={onLogout}>Log out</button>
    </>
  );
};

export default Profile;
