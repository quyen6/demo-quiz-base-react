import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import avatar from "../../../assets/avatar.png";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const {
    show,
    setShow,
    dataDelete,
    fetchListUser,
    fetchListUserWithPaginate,
    currentPage,
    setCurrentPage,
  } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);

    if (data && data.EC === 0) {
      //EC : error code
      toast.success(data.EM); //EM: error message
      handleClose();
      //   await fetchListUser();

      setCurrentPage(1);
      await fetchListUserWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modal-delete-user"
      >
        <Modal.Header>
          <Modal.Title>Delete User ?</Modal.Title>
          <p>Deleting this profile will remove all personal data</p>
        </Modal.Header>
        <Modal.Body>
          {dataDelete && (
            <div className="modal-body-content">
              <div className="user-avatar">
                <img
                  src={
                    dataDelete.image
                      ? `data:image/jpeg;base64,${dataDelete.image}`
                      : avatar
                  }
                  alt="avt"
                />
              </div>
              <div className="user-info">
                <ul>
                  <li>
                    <strong>Email</strong> : &nbsp;{dataDelete.email}
                  </li>
                  <li>
                    <strong>Username</strong> : &nbsp;{dataDelete.username}
                  </li>
                  <li>
                    <strong>Role</strong> : &nbsp;{dataDelete.role}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteUser()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
