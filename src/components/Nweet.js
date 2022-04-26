const Nweet = ({ nweet, isOwner }) => {
  return (
    <div key={nweet.id}>
      <h4>{nweet.text}</h4>
      {isOwner && (
        <>
          <button>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
