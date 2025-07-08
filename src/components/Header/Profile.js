import { useEffect, useRef, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Information from "./SettingProfile/Information";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import "./SettingProfile.scss";
import {
  getSHowHistory,
  postChangePassword,
  postUpdateProfile,
} from "../../services/apiServices";
import { toast } from "react-toastify";
import { updateInformation } from "../../redux/action/userAction";
import { Table } from "react-bootstrap";
const Profile = (props) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const { showProfile, setShowProfile } = props;
  const [key, setKey] = useState("information");
  const [editInfor, setEditInfor] = useState(false);
  const [editedName, setEditedName] = useState(account.username);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [historyQuiz, setHistoryQuiz] = useState([]);

  const handleClose = () => {
    setShowProfile(false);
    setEditInfor(false);
    setSelectedImage();
    setKey("information");
  };

  useEffect(() => {
    setEditedName(account.username || "");
    // setPreviewImage(
    //   account.image ? `data:image/jpeg;base64,${account.image}` : null
    // );
  }, [account]);
  useEffect(() => {
    if (key === "history") {
      handleShowHistory();
    }
  }, [key]);

  const handleSubmitEditInfor = async () => {
    let res = await postUpdateProfile(editedName, selectedImage);
    if (res && res.EC === 0) {
      dispatch(updateInformation(res.DT));
      toast.success(res.EM);
      setEditInfor(false);
      setSelectedImage(null);
    } else {
      toast.error(res.EM);
    }
  };

  // Expose method to parent

  // Handle image change
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedImage(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmitChangePassword = async () => {
    // validate password

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please enter your password!");
      return;
    }

    // match password
    if (newPassword === confirmPassword) {
      let res = await postChangePassword(currentPassword, newPassword);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        setCurrentPassword();
        setNewPassword();
        setConfirmPassword();
        setShowProfile(false);
      } else {
        toast.error(res.EM);
      }
    } else {
      toast.error("Passwords don't match");
    }
  };

  const handleShowHistory = async () => {
    let res = await getSHowHistory();
    setHistoryQuiz(res.DT.data);
  };

  return (
    <>
      <Modal
        show={showProfile}
        onHide={handleClose}
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="information" title="Main Information">
              <div className="main-information">
                <div className="user-avatar text-center">
                  {editInfor ? (
                    <>
                      {" "}
                      {/* <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      /> */}
                      <img
                        src={
                          previewImage // nếu đã chọn ảnh mới thì dùng ảnh đó
                            ? previewImage
                            : account.image // nếu chưa chọn ảnh mới thì dùng ảnh cũ
                            ? `data:image/jpeg;base64,${account.image}`
                            : avatar // nếu không có ảnh cũ thì dùng ảnh mặc định
                        }
                        alt="avatar"
                      />
                    </>
                  ) : (
                    <img
                      src={
                        account.image
                          ? `data:image/jpeg;base64,${account.image}`
                          : avatar
                      }
                      alt="avt"
                    />
                  )}
                </div>
                <div className="user-info">
                  <ul>
                    <li>
                      <strong>Email</strong>: {account.email}
                    </li>
                    {editInfor ? (
                      <li className="d-flex">
                        <strong>Username</strong>: &nbsp;
                        <input
                          type="text"
                          placeholder=""
                          value={editedName}
                          required
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      </li>
                    ) : (
                      <>
                        {" "}
                        <strong>Username</strong>: {account.username}
                      </>
                    )}
                    <li>
                      <strong>Role</strong>: {account.role}
                    </li>
                  </ul>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Change Password">
              <div className="change-password-form">
                <form>
                  <div className="form-group mb-3">
                    <label>Current Password</label>
                    <input
                      type="new-password"
                      className="form-control "
                      placeholder=""
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>New Password</label>
                    <input
                      type="new-password"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Confirm New Password</label>
                    <input
                      type="new-password"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </Tab>
            <Tab eventKey="history" title="History">
              {historyQuiz.length === 0 ? (
                <p>No data</p>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Quiz Name</th>
                      <th>Description</th>
                      <th>Total Questions</th>
                      <th>Correct</th>
                      <th>Score (%)</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyQuiz.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.quizHistory.name}</td>
                        <td>{item.quizHistory.description}</td>
                        <td>{item.total_questions}</td>
                        <td>{item.total_correct}</td>
                        <td>
                          {(
                            (item.total_correct / item.total_questions) *
                            100
                          ).toFixed(2)}
                          %
                        </td>
                        <td>
                          {new Date(item.createdAt).toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {key === "information" &&
            (editInfor ? (
              <Button variant="primary" onClick={handleSubmitEditInfor}>
                Save
              </Button>
            ) : (
              <Button variant="warning" onClick={() => setEditInfor(true)}>
                Edit Info
              </Button>
            ))}

          {key === "profile" && (
            <Button
              variant="danger"
              onClick={() => handleSubmitChangePassword()}
            >
              Change Password
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
