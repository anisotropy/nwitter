import { database } from "appFirebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";

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
        console.log(nweets);
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
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default Nweeting;
