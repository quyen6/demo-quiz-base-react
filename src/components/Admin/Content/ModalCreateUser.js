import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalCreateUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const handleUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];
      setSelectedFile(image);
      const imgPreview = URL.createObjectURL(image);
      setPreviewImg(imgPreview);
    }
    console.log(
      "🚀 ~ handleUploadFile ~ event.target.files[0]:",
      event.target.files[0]
    );
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewImg(null);
    inputRef.current.value = null;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" placeholder="" />
            </div>

            <div className="col-md-3">
              {" "}
              <label className="form-label">Role</label>
              <select className="form-select">
                <option selected value="USERS">
                  USERS
                </option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12 upload-file">
              <input
                type="file"
                ref={inputRef}
                onChange={handleUploadFile}
                hidden
              />

              <button
                type="button"
                className="file-btn col-md-6"
                onClick={onChooseFile}
              >
                <span>
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </span>
                Upload File
              </button>
              {selectedFile && (
                <div className="selected-file col-md-6">
                  <p>{selectedFile.name}</p>

                  <button onClick={removeFile}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>
            <div className="col-md-12 img-preview">
              {selectedFile ? (
                <img src={previewImg} alt="Preview" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
