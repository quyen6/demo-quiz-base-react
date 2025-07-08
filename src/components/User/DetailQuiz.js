import { useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import ModalResult from "./ModalResult";
import RightContent from "./QuizContent/RightContent";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "react-bootstrap";

const DetailQuiz = (props) => {
  const { t } = useTranslation();
  const params = useParams();
  const quizId = params.id;

  const location = useLocation();
  // console.log("🚀 ~ DetailQuiz ~ location:", location);

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isFinished, setIsFinished] = useState(false);
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);

    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.selected = false;
            answers.push(item.answers);
          });

          return { questionId: key, answers, questionDescription, image };
        })
        .value();

      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (currentQuestion - 1 < 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > currentQuestion + 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      let b = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.selected = !item.selected;
        }
        return item;
      });
      // console.log("🚀 ~ b ~ b:", b);
      question.answers = b;
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinishQuiz = async () => {
    setIsFinished(true);
    // console.log("🚀 ~ handleFinishQuiz ~ dataQuiz:", dataQuiz);
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionid = item.questionId;
        let userAnswerId = [];

        item.answers.forEach((answer) => {
          if (answer.selected) {
            userAnswerId.push(+answer.id);
          }
        });
        // todo
        answers.push({ questionId: +questionid, userAnswerId: userAnswerId });
      });
    }

    payload.answers = answers;

    // submit api

    let res = await postSubmitQuiz(payload);

    if (res && res.EC === 0) {
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
      setShowModalResult(true);
      // alert(res.EM);
      // console.log("🚀 ~ handleFinishQuiz ~ res:", res);
    } else {
      alert("Something wrongs with server, please try again later!");
    }
  };
  return (
    <>
      <div className="detail-quiz-container container mt-3 d-flex flex-column">
        {/* <Breadcrumb className="breadcrumb-detail-quiz">
          <NavLink to="/" className="breadcrumb-item">
            Home
          </NavLink>
          <NavLink to="/users" className="breadcrumb-item">
            Users
          </NavLink>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="main-content d-flex ">
          <div className="left-content">
            <div className="title">
              <h2>
                {t("user.detailquiz.title")} {quizId}:{" "}
                {location?.state?.quizTitle}
              </h2>
            </div>
            <hr />
            {/* <div className="quiz-body text-center"></div> */}
            <div className="quiz-content my-4">
              <Question
                data={
                  dataQuiz && dataQuiz.length > 0
                    ? dataQuiz[currentQuestion]
                    : []
                }
                currentQuestion={currentQuestion}
                handleCheckbox={handleCheckbox}
              />
            </div>
            <div className="footer mt-3">
              <button onClick={() => handlePrev()}>
                {" "}
                {t("user.detailquiz.prev")}
              </button>
              <button onClick={() => handleNext()}>
                {" "}
                {t("user.detailquiz.next")}
              </button>
              <button
                className="finish btn btn-success"
                onClick={() => handleFinishQuiz()}
              >
                {t("user.detailquiz.finish")}
              </button>
            </div>
          </div>

          <div className="right-content-container">
            <RightContent
              dataQuiz={dataQuiz}
              handleFinishQuiz={handleFinishQuiz}
              setCurrentQuestion={setCurrentQuestion}
              currentQuestion={currentQuestion}
              isFinished={isFinished}
            />
          </div>
        </div>

        <ModalResult
          show={showModalResult}
          setShow={setShowModalResult}
          dataModalResult={dataModalResult}
        />
      </div>
    </>
  );
};
export default DetailQuiz;
