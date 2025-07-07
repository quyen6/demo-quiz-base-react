import { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import "./ManageUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import TableUser from "./TableUser";
import { getAllUser, getUserWithPaginate } from "../../../services/apiServices";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { useTranslation } from "react-i18next";

const ManageUsers = (props) => {
  const { t } = useTranslation();
  const LIMIT_USER = 7;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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

  const fetchListUserWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };
  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPaginate(1);
  }, []);

  const handleClickBtnUpdateUser = (user) => {
    setDataUpdate(user);
    setShowModalUpdateUser(true);
  };
  const resetUpdateData = () => {
    setDataUpdate("");
  };

  const handleClickBtnViewUser = (user) => {
    setDataUser(user);
    setShowModalViewUser(true);
  };
  const handleClickBtnDeleteUser = (user) => {
    setDataDelete(user);
    setShowModalDeleteUser(true);
  };

  return (
    <div className="manage-user-container">
      <div className="title">{t("admin.content.manage-user.title")}</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-success"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            &nbsp; {t("admin.content.manage-user.btn-add")}
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUser={listUser}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickBtnViewUser={handleClickBtnViewUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
          /> */}
          <TableUserPaginate
            listUser={listUser}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickBtnViewUser={handleClickBtnViewUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUser={fetchListUser}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUser={dataUser}
          setDataUser={setDataUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          setDataUser={setDataDelete}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
