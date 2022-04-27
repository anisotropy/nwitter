import { auth, database } from "appFirebase";
import { signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import Nweet from "./Nweet";

const Profile = ({ user }) => {
  const [state, setState] = useState({
    displayName: user.displayName || "",
    nweets: [],
  });

  const onLogout = async () => {
    await signOut(auth);
  };

  const getNweets = useCallback(async () => {
    const ref = collection(database, "nweet");
    const q = query(
      ref,
      where("creatorId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const nweets = [];
    snapshot.forEach((doc) => nweets.push({ id: doc.id, ...doc.data() }));
    setState((prev) => ({ ...prev, nweets }));
  }, [user.uid]);

  useEffect(() => {
    getNweets();
  }, [getNweets]);

  const onChange = (event) => {
    setState((prev) => ({ ...prev, displayName: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(auth.currentUser, { displayName: state.displayName });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        Display name:{" "}
        <input
          type="text"
          placeholder="Display name"
          value={state.displayName}
          onChange={onChange}
        />
        <button type="submit">Update display name</button>
      </form>
      <div>
        {state.nweets.map((nweet) => (
          <Nweet key={nweet.id} nweet={nweet} user={user} />
        ))}
      </div>
      <button onClick={onLogout}>Log out</button>
    </>
  );
};

export default Profile;
