import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ManageQuiz.scss";
import Select from "react-select";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");

  const [previewImage, setPreviewImage] = useState(null);
  const [selectImage, setSelectImage] = useState(null);
  const inputRef = useRef();

  const handleSelectImage = (event) => {
    inputRef.current.click();
    if (event.target.files && event.target.files.length > 0) {
      setSelectImage(event.target.files[0]);
      const imgPreview = URL.createObjectURL(event.target.files[0]);
      setPreviewImage(imgPreview);
    }
  };
  const removeFile = () => {
    setSelectImage(null);
    setPreviewImage(null);
  };
  return (
    <div className="manage-quiz-container">
      <div className="title">Manage Quiz</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new Quiz</legend>
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
            <div className="quiz-type">
              <Select
                value={type}
                // onChange={this.handleChange}
                options={options}
                placeholder="Quiz Type"
              />
            </div>
            <div className="quiz-image">
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
              className="selected-file"
              style={selectImage ? { opacity: 1 } : { opacity: 0 }}
            >
              <p>{selectImage?.name}</p>

              <button onClick={() => removeFile()}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
          <div className="preview-image mt-3 ">
            {selectImage ? (
              <img src={previewImage} alt="Preview" className="img-thumbnail" />
            ) : (
              <span>Preview Image</span>
            )}
            {console.log("🚀 ~ ManageQuiz ~ previewImage:", previewImage)}
          </div>
        </fieldset>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};

export default ManageQuiz;
