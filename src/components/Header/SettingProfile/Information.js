import { useSelector } from "react-redux";

const Information = (props) => {
  const { ref } = props;
  const account = useSelector((state) => state.user.account);
  return (
    <div className="main-information">
      <div className="user-avatar">
        <img
          src={account.image ? `data:image/jpeg;base64,${account.image}` : ``}
          alt="avt"
        />
      </div>
      <div className="user-info">
        <ul>
          <li>
            <strong>Email</strong>: {account.email}
          </li>
          <li>
            <strong>Username</strong>: {account.username}
          </li>
          <li>
            <strong>Role</strong>: {account.role}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Information;
