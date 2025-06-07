import { useRef, useState } from "react";

import { toast } from "react-toastify";
import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../../../services/apiServices";

const ModalCreateUser = (props) => {
  const { show, setShow } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");

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
  };

  const handleUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];
      setSelectedFile(image);
      const imgPreview = URL.createObjectURL(image);
      setPreviewImg(imgPreview);
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = (password) => {
    return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length > 4
    );
  };
  const handleSubmitCreateUser = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    if (!isValidEmail) {
      toast.error("Invalid Email ");
      return;
    }
    if (!isValidPassword) {
      toast.error("Invalid Password ");
      return;
    }

    //call api

    let data = await postCreateUser(
      email,
      password,
      username,
      role,
      selectedFile
    );

    if (data && data.EC === 0) {
      //EC : error code
      toast.success(data.EM); //EM: error message
      handleClose();
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
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
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
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              {" "}
              <label className="form-label">Role</label>
              <select
                defaultValue={role}
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
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
