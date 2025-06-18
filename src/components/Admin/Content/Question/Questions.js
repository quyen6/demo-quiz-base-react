import { useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import "./Questions.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faMinusCircle,
  faPlusCircle,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      image: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "question 1",
        image: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    if (type === "ADD") {
      let questionsClone = _.cloneDeep(questions);
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);

      if (index > -1) {
        questionsClone[index].answers.push(newAnswer);
      }
      setQuestions(questionsClone);
    }

    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].answers = questionsClone[index].answers.filter(
          (item) => item.id !== answerId
        );
      }
      setQuestions(questionsClone);
    }
  };

  const handleOnChange = (type, id, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === id);
      if (index > -1) {
        questionsClone[index].description = value;
      }
      setQuestions(questionsClone);
    }
  };

  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1 && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
    }
    setQuestions(questionsClone);
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);

    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }

            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionForQuiz = () => {
    console.log(questions);
  };
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <div className="body-wrapper">
        <div className=" main-content">
          <div className="select-quiz col-6">
            <label className="mb-1">Select Quiz: </label>
            <div className="add-new-question">
              <Select
                options={options}
                value={selectedQuestion}
                onChange={setSelectedQuestion}
              />
            </div>
          </div>
          <div className=" mt-3 questions-answers">
            <div className="mb-1"> Add questions:</div>

            {questions &&
              questions.length > 0 &&
              questions.map((question, index) => {
                return (
                  <div
                    className="group-questions-answers mb-4"
                    key={question.id}
                  >
                    <div className="questions-content d-flex align-items-center gap-1 ">
                      <div className="description form-floating col-6 ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name@example.com"
                          onChange={(e) =>
                            handleOnChange(
                              "QUESTION",
                              question.id,
                              e.target.value
                            )
                          }
                        />
                        <label>Description for Question {index + 1}</label>
                      </div>
                      <div className="group-upload col-6 d-flex align-items-center gap-5">
                        <div className="upload-image">
                          <label
                            className="label-upload"
                            htmlFor={`${question.id}`}
                          >
                            <FontAwesomeIcon icon={faFileCirclePlus} />
                          </label>
                          <input
                            type="file"
                            id={`${question.id}`}
                            hidden
                            onChange={(e) =>
                              handleOnChangeFileQuestion(question.id, e)
                            }
                          />
                          {/* <span>
                            {question?.imageName
                              ? question?.imageName
                              : "0 image is uploaded"}
                          </span> */}
                          {question?.imageName ? (
                            <div class="test1">
                              <span class="ellipsis">
                                {question?.imageName}
                              </span>
                              <span class="indent">{question?.imageName}</span>
                            </div>
                          ) : (
                            <span>0 image is uploaded</span>
                          )}
                        </div>
                        <div className="btn-group">
                          <button
                            className="add-icon"
                            onClick={() => handleAddRemoveQuestion("ADD", "")}
                          >
                            <FontAwesomeIcon icon={faPlusCircle} />
                          </button>
                          {questions.length > 1 && (
                            <button className="delete-icon">
                              <FontAwesomeIcon
                                icon={faMinusCircle}
                                onClick={() =>
                                  handleAddRemoveQuestion("REMOVE", question.id)
                                }
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {question.answers &&
                      question.answers.length > 0 &&
                      question.answers.map((answer, index) => {
                        return (
                          <div className="answers-content mt-3" key={answer.id}>
                            <input
                              className="form-check-input iscorrect"
                              type="checkbox"
                              checked={answer.isCorrect}
                              onChange={(e) =>
                                handleAnswerQuestion(
                                  "CHECKBOX",
                                  question.id,
                                  answer.id,
                                  e.target.checked
                                )
                              }
                            />{" "}
                            <div className="form-floating answer">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="name@example.com"
                                value={answer.description}
                                onChange={(e) =>
                                  handleAnswerQuestion(
                                    "INPUT",
                                    question.id,
                                    answer.id,
                                    e.target.value
                                  )
                                }
                              />
                              <label>Answer {index + 1}</label>
                            </div>
                            <div className="btn-group">
                              <button
                                className="add-icon"
                                onClick={() =>
                                  handleAddRemoveAnswer("ADD", question.id, "")
                                }
                              >
                                <FontAwesomeIcon icon={faSquarePlus} />
                              </button>
                              {question.answers.length > 1 && (
                                <button
                                  className="delete-icon"
                                  onClick={() =>
                                    handleAddRemoveAnswer(
                                      "REMOVE",
                                      question.id,
                                      answer.id
                                    )
                                  }
                                >
                                  <FontAwesomeIcon icon={faSquareMinus} />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>

          {questions && questions.length > 0 && (
            <div className="btn-save  ">
              <button
                className="btn btn-warning  me-5 mt-5 "
                onClick={() => handleSubmitQuestionForQuiz()}
              >
                Save Questions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
