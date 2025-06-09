import { useEffect, useRef, useState } from "react";
import _ from "lodash";

import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalViewUser = (props) => {
  const { show, setShow, dataUser, setDataUser } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");

  useEffect(() => {
    if (!_.isEmpty(dataUser)) {
      //update state
      setEmail(dataUser.email);
      setUsername(dataUser.username);
      setRole(dataUser.role);
      if (dataUser.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataUser.image}`);
      }
    }
  }, [dataUser]);

  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setSelectedFile("");
    setPreviewImg("");
    setDataUser("");
  };

  const handleUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);

      setPreviewImg(URL.createObjectURL(event.target.files[0]));
    }
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
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Information user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={username}
                disabled
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              {" "}
              <label className="form-label">Role</label>
              <select
                disabled
                value={role}
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12 upload-file">
              <input
                type="file"
                ref={inputRef}
                onChange={handleUploadFile}
                hidden
                disabled
                style={{ cursor: "none" }}
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
              {previewImg ? (
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
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalViewUser;
