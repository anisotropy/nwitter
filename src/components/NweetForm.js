import { useState } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { database, storage } from "appFirebase";
import { addDoc, collection } from "firebase/firestore";

const NweetForm = ({ user }) => {
  const [state, setState] = useState({ nweet: "", attachment: "" });

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
    let attachmentId = "";
    let attachmentUrl = "";
    if (state.attachment) {
      attachmentId = uuidv4();
      const storageRef = ref(storage, `${user.uid}/${attachmentId}`);
      await uploadString(storageRef, state.attachment, "data_url");
      attachmentUrl = await getDownloadURL(storageRef);
    }

    try {
      await addDoc(collection(database, "nweet"), {
        text: state.nweet,
        createdAt: Date.now(),
        creatorId: user.uid,
        attachmentId,
        attachmentUrl,
      });
      setState((prev) => ({ ...prev, nweet: "", attachment: "" }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
};

export default NweetForm;
