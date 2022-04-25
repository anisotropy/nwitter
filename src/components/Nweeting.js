import { database } from "appFirebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

const Writting = () => {
  const [nweet, setNweet] = useState("");

  const onChange = (event) => {
    setNweet(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(database, "nweet"), {
        nweet,
        createdAt: Date.now(),
      });
      setNweet("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
};

export default Writting;
