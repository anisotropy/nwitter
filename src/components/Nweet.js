import { database, storage } from "appFirebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Nweet = ({ nweet, user }) => {
  const [state, setState] = useState({ isEditting: false, text: nweet.text });

  const onDelete = async () => {
    await deleteDoc(doc(database, "nweet", nweet.id));
    if (nweet.attachmentId) {
      const attachmentRef = ref(storage, `${user.uid}/${nweet.attachmentId}`);
      await deleteObject(attachmentRef);
    }
  };

  const onToggleEdit = () => {
    setState((prev) => ({
      ...prev,
      isEditting: !prev.isEditting,
      text: nweet.text,
    }));
  };

  const onChange = (event) => {
    setState((prev) => ({ ...prev, text: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(database, "nweet", nweet.id), { text: state.text });
    setState((prev) => ({ ...prev, isEditting: false }));
  };

  return (
    <div key={nweet.id}>
      {state.isEditting ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={state.text}
              placeholder="Update your nweet"
              onChange={onChange}
            />
            <button type="submit">Update</button>
            <button onClick={onToggleEdit}>Cancel</button>
          </form>
        </>
      ) : (
        <>
          <h4>{nweet.text}</h4>
          {nweet.attachmentUrl && (
            <img
              src={nweet.attachmentUrl}
              width={50}
              height={50}
              alt="attachment"
            />
          )}
          {user.uid === nweet.creatorId && (
            <>
              <button onClick={onDelete}>Delete</button>
              <button onClick={onToggleEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
