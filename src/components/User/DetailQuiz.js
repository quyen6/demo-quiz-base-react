import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  const location = useLocation();
  // console.log("🚀 ~ DetailQuiz ~ location:", location);

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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

  return (
    <div className="detail-quiz-container container mt-3">
      <div className="left-content">
        <div className="title">
          <h2>
            Quiz {quizId}: {location?.state?.quizTitle}
          </h2>
        </div>
        <hr />
        {/* <div className="quiz-body text-center"></div> */}
        <div className="quiz-content my-4">
          <Question
            data={
              dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []
            }
            currentQuestion={currentQuestion}
            handleCheckbox={handleCheckbox}
          />
        </div>
        <div className="footer mt-3">
          <button onClick={() => handlePrev()}>Prev</button>
          <button onClick={() => handleNext()}>Next</button>
          <button
            className="finish btn btn-success"
            onClick={() => handleNext()}
          >
            Finish
          </button>
        </div>
      </div>

      <div className="right-content">count down</div>
    </div>
  );
};
export default DetailQuiz;
