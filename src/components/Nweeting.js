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
  const [state, setState] = useState({ nweet: "", nweets: [], attchment: "" });

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

  const onChange = (event) => {
    setState((prev) => ({ ...prev, nweet: event.target.value }));
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = (fileEvent) => {
        setState((prev) => ({
          ...prev,
          attchment: fileEvent.currentTarget.result,
        }));
      };
      fileReader.readAsDataURL(file);
    } else {
      setState((prev) => ({ ...prev, attchment: "" }));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(database, "nweet"), {
        text: state.nweet,
        createdAt: Date.now(),
        creatorId: user.uid,
      });
      setState((prev) => ({ ...prev, nweet: "" }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={state.nweet}
          placeholder="What's your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {state.attchment && (
          <img src={state.attchment} width={50} height={50} alt="Profile" />
        )}
        <button type="submit">Nweet</button>
      </form>
      <div>
        {state.nweets.map((nweet) => (
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
