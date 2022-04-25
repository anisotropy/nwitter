const { useState } = require("react");

const Writting = () => {
  const [nwit, setNwit] = useState("");

  const onChange = (event) => {
    setNwit(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={nwit}
        placeholder="What's your mind?"
        maxLength={120}
        onChange={onChange}
      />
      <button type="submit">Nwit</button>
    </form>
  );
};

export default Writting;
