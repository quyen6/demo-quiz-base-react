import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import "./ManageUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import TableUser from "./TableUser";
import { getAllUser } from "../../../services/apiServices";

const ManageUsers = (props) => {
  // Add
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  // Update/Edit
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  const [listUser, setListUser] = useState([]);

  //prop user when click btn edit
  const [dataUpdate, setDataUpdate] = useState({});

  // call api
  const fetchListUser = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  useEffect(() => {
    fetchListUser();
  }, []);

  const handleClickBtnUpdateUser = (user) => {
    console.log("🚀 ~ handleClickBtnUpdateUser ~ user:", user);
    setDataUpdate(user);
    setShowModalUpdateUser(true);
  };
  const resetUpdateData = () => {
    setDataUpdate("");
  };

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
          <TableUser
            listUser={listUser}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUser={fetchListUser}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
