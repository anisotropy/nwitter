import { database } from "appFirebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Nweet from "./Nweet";

function Nweeting({ user }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(database, "nweet"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const nweets = [];
        snapshot.forEach((doc) => {
          nweets.push({ id: doc.id, ...doc.data() });
        });
        setNweets(nweets);
      }
    );
  }, []);

  const onChange = (event) => {
    setNweet(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(database, "nweet"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: user.uid,
      });
      setNweet("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          placeholder="What's your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <button type="submit">Nweet</button>
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweet={nweet}
            isOwner={nweet.creatorId === user.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Nweeting;
