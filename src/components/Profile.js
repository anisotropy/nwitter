import { auth, database } from "appFirebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect } from "react";

const Profile = ({ user }) => {
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
    snapshot.forEach((doc) => nweets.push(doc.data()));
    console.log(nweets);
  }, [user.uid]);

  useEffect(() => {
    getNweets();
  }, [getNweets]);

  return (
    <>
      <button onClick={onLogout}>Log out</button>
    </>
  );
};

export default Profile;
