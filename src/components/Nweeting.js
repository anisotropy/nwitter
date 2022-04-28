import { database } from "appFirebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import Nweet from "./Nweet";
import NweetForm from "./NweetForm";

function Nweeting({ user }) {
  const [state, setState] = useState({ nweets: [] });

  useEffect(() => {
    onSnapshot(
      query(collection(database, "nweet"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const nweets = [];
        snapshot.forEach((doc) => {
          nweets.push({ id: doc.id, ...doc.data() });
        });
        setState((prev) => ({ ...prev, nweets }));
      }
    );
  }, []);

  return (
    <>
      <NweetForm user={user} />
      <div>
        {state.nweets.map((nweet) => (
          <Nweet key={nweet.id} nweet={nweet} user={user} />
        ))}
      </div>
    </>
  );
}

export default Nweeting;
