import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ManageQuiz.scss";
import Select from "react-select";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
  deleteQuiz,
  getAllQuizForAdmin,
  postCreateNewQuiz,
  putUpdateQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import { Accordion, Modal } from "react-bootstrap";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const [selectImage, setSelectImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const inputRef = useRef();

  const [listQuiz, setListQuiz] = useState([]);

  const [activeKey, setActiveKey] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("");

  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const handleSelectImage = (event) => {
    inputRef.current.click();
    if (event.target.files && event.target.files.length > 0) {
      setSelectImage(event.target.files[0]);
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const removeFile = () => {
    setSelectImage(null);
    setPreviewImage(null);
  };

  const handleSubmitQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name and Description are required!");
      return;
    }

    let res = await postCreateNewQuiz(
      description,
      name,
      type?.value,
      selectImage
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setSelectImage(null);
      setPreviewImage(null);
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleClickBtnEditQuiz = (quiz) => {
    console.log("🚀 ~ handleClickBtnEditQuiz ~ quiz:", quiz);
    setActiveKey("0"); // mở Accordion
    setIsEditing(true);
    setName(quiz.name);
    setDescription(quiz.description);
    setType({
      value: quiz.difficulty,
      label: quiz.difficulty,
    });
    setSelectImage(quiz.image);
    setPreviewImage(quiz.image ? `data:image/jpeg;base64,${quiz.image}` : null);
    setId(quiz.id);
  };
  const handleEditQuiz = async () => {
    //validate
    if (!name || !description || !selectImage) {
      toast.error("Name, Description and Image are required!");
      return;
    }

    let res = await putUpdateQuiz(
      id,
      description,
      name,
      type?.value,
      selectImage
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setActiveKey(null);
      setName("");
      setDescription("");
      setType("");
      setSelectImage(null);
      setPreviewImage(null);
      setIsEditing(false);
      fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  const handleClose = () => {
    setShowModalDeleteQuiz(false);
  };
  const handleClickBtnDeleteQuiz = (quiz) => {
    setShowModalDeleteQuiz(true);
    setQuizToDelete(quiz);
  };
  const handleSubmitDeleteQuiz = async () => {
    let res = await deleteQuiz(quizToDelete.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setShowModalDeleteQuiz(false);
      setQuizToDelete(null);
      fetchQuiz();
    } else {
      toast.error(res.EM);
      setShowModalDeleteQuiz(false);
    }
  };
  return (
    <div className="manage-quiz-container">
      <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="title"> Manage Quiz</div>
          </Accordion.Header>
          {
            <Accordion.Body className="p-0 pt-4">
              <div className="add-new">
                <fieldset className="border-top  p-3">
                  <legend className="float-none w-auto px-3">
                    {isEditing ? "Edit Quiz" : "Add new Quiz"}
                  </legend>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label>Name</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>Description</label>
                  </div>
                  <div className="more-actions d-flex justify-content-between align-items-center mt-3">
                    <div className="quiz-type col-4">
                      <Select
                        value={type}
                        onChange={setType}
                        options={options}
                        placeholder="Quiz Type"
                      />
                    </div>
                    <div className="quiz-image col-3">
                      <label htmlFor="addImage">
                        {" "}
                        <FontAwesomeIcon icon={faPlusCircle} />
                        &nbsp; Upload Image
                      </label>
                      <input
                        type="file"
                        ref={inputRef}
                        id="addImage"
                        hidden
                        onChange={(event) => handleSelectImage(event)}
                      />
                    </div>

                    <div
                      className="selected-file col-4"
                      style={selectImage ? { opacity: 1 } : { opacity: 0 }}
                    >
                      <p>
                        {selectImage?.name
                          ? selectImage?.name
                          : "Delete Or Upload Image"}
                      </p>

                      <button onClick={() => removeFile()}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                  <div className="preview-image mt-3 ">
                    {selectImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="img-thumbnail"
                      />
                    ) : (
                      <span>Preview Image</span>
                    )}
                  </div>
                  <div>
                    <button
                      className="btn btn-success float-end"
                      onClick={() => {
                        isEditing ? handleEditQuiz() : handleSubmitQuiz();
                      }}
                    >
                      {isEditing ? "Update Quiz" : "Add Quiz"}
                    </button>
                  </div>
                </fieldset>
              </div>
            </Accordion.Body>
          }
        </Accordion.Item>
      </Accordion>
      <div className="list-detail">
        <TableQuiz
          handleClickBtnEditQuiz={handleClickBtnEditQuiz}
          handleClickBtnDeleteQuiz={handleClickBtnDeleteQuiz}
          listQuiz={listQuiz}
          handleSubmitDeleteQuiz={handleSubmitDeleteQuiz}
        />
      </div>
      <Modal
        show={showModalDeleteQuiz}
        onHide={handleClose}
        backdrop="static"
        className="modal-delete-user"
      >
        <Modal.Header className="d-flex flex-column align-items-center">
          <Modal.Title>Delete Quiz?</Modal.Title>
          <p> Are you sure you want to delete this quiz?</p>
        </Modal.Header>
        <Modal.Body className="flex-row ">
          <br />
          <div className="card text-center" style={{ width: "15rem" }}>
            {quizToDelete?.image && (
              <img
                src={`data:image/jpeg;base64,${quizToDelete.image}`}
                className="card-img-top"
                alt="..."
              />
            )}
            <div className="card-body text-start">
              <h5 className="card-title">Quiz: {quizToDelete?.name}</h5>
              <p className="card-text mb-1">
                Desc: {quizToDelete?.description}
              </p>
              <p className="card-text">Quiz Type: {quizToDelete?.difficulty}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row  justify-content-center">
          <button
            className="btn btn-secondary fs-6 w-0 px-3 border"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger fs-6 w-0 px-3"
            onClick={handleSubmitDeleteQuiz}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageQuiz;
