const { Link } = require("react-router-dom");

const Navitation = ({ user }) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{user.displayName}'s Profile</Link>
      </li>
    </ul>
  );
};

export default Navitation;
