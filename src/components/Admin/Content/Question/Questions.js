import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuestion, setSelectedQuestion] = useState({});
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <div className="body-wrapper">
        <div className=" questions-content">
          <div className="select-quiz col-6">
            <label>Select Quiz: </label>
            <div className="add-new-question">
              <Select
                options={options}
                value={selectedQuestion}
                onChange={setSelectedQuestion}
              />
            </div>
          </div>
          <div className="mt-3 add-new-question">
            Add questions:
            <div className="d-flex align-items-center gap-1 ">
              <div className="form-floating col-6 description">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name@example.com"
                />
                <label>Description</label>
              </div>
              <div className="col-6 group-upload d-flex align-items-center gap-5">
                <div className="upload-image">
                  <label className="label-upload">Upload Image</label>
                  <input type="file" hidden />
                  <span>0 file is uploaded</span>
                </div>
                <div className="btn-group">
                  <button>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                  <button>
                    <FontAwesomeIcon
                      icon={faMinusCircle}
                      style={{ color: "red" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="answers-content mt-3">
          <input className="form-check-input iscorrect" type="checkbox" />{" "}
          <div className="form-floating answer">
            <input
              type="text"
              className="form-control"
              placeholder="name@example.com"
            />
            <label>Answer 1</label>
          </div>
          <div className="btn-group">
            <button>
              <FontAwesomeIcon icon={faSquarePlus} />
            </button>
            <button>
              <FontAwesomeIcon icon={faSquareMinus} style={{ color: "red" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
