import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import "./ManageUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import TableUser from "./TableUser";
import { getAllUser } from "../../../services/apiServices";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUsers = (props) => {
  // Add
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  // Update/Edit
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  // View
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  // Delete
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  const [listUser, setListUser] = useState([]);

  //prop user when click btn edit
  const [dataUpdate, setDataUpdate] = useState({});
  //prop user when click btn view
  const [dataUser, setDataUser] = useState({});
  //prop user when click btn delete
  const [dataDelete, setDataDelete] = useState({});

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
    setDataUpdate(user);
  };
  const resetUpdateData = () => {
    setDataUpdate("");
  };

  const handleClickBtnViewUser = (user) => {
    setDataUser(user);
    setShowModalViewUser(true);
  };
  const handleClickBtnDeleteUser = (user) => {
    console.log("🚀 ~ handleClickBtnDeleteUser ~ user:", user);
    setDataDelete(user);
    setShowModalDeleteUser(true);
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
            handleClickBtnViewUser={handleClickBtnViewUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
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
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUser={dataUser}
          setDataUser={setDataUser}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          setDataUser={setDataDelete}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
