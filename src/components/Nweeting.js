import { database, storage } from "appFirebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Nweet from "./Nweet";

function Nweeting({ user }) {
  const [state, setState] = useState({ nweet: "", nweets: [], attachment: "" });

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
          attachment: fileEvent.currentTarget.result,
        }));
      };
      fileReader.readAsDataURL(file);
    } else {
      setState((prev) => ({ ...prev, attachment: "" }));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachment = "";
    if (state.attachment) {
      const storageRef = ref(storage, `${user.uid}/${uuidv4()}`);
      await uploadString(storageRef, state.attachment, "data_url");
      attachment = await getDownloadURL(storageRef);
    }

    try {
      await addDoc(collection(database, "nweet"), {
        text: state.nweet,
        createdAt: Date.now(),
        creatorId: user.uid,
        attachment,
      });
      setState((prev) => ({ ...prev, nweet: "", attachment: "" }));
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
        {state.attachment && (
          <img src={state.attachment} width={50} height={50} alt="Profile" />
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
