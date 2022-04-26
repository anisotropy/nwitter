import { database } from "appFirebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

function Nweeting() {
  const didMount = useRef(false);
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const querySnapshot = await getDocs(collection(database, "nweet"));
    querySnapshot.forEach((doc) => {
      setNweets((prev) => [{ id: doc.id, ...doc.data() }, ...prev]);
    });
  };

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    getNweets();
  }, []);

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
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default Nweeting;
