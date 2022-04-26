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

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (fileEvent) => {
      console.log(fileEvent.target.result);
    };
    fileReader.readAsDataURL(file);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
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
