import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const ManageUsers = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="manage-user-container">
      <div className="title">Manage</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-success"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            &nbsp; Add new users
          </button>
        </div>
        <div className="table-users-container">
          <p style={{ fontSize: "20px" }}>Table users</p>
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
