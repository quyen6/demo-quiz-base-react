import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import TableUser from "./TableUser";
import { getAllUser } from "../../../services/apiServices";

const ManageUsers = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listUser, setListUser] = useState([]);

  const fetchListUser = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  useEffect(() => {
    fetchListUser();
  }, []);

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
          <TableUser listUser={listUser} />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
