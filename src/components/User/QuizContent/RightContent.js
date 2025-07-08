import CountDown from "./CountDown";
import { useEffect, useRef } from "react";
const RightContent = (props) => {
  const {
    dataQuiz,
    handleFinishQuiz,
    setCurrentQuestion,
    currentQuestion,
    isFinished,
  } = props;
  const refClick = useRef([]);

  const onTimeUp = () => {
    handleFinishQuiz();
  };
  const getClassQuestion = (index, question) => {
    // check answered

    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.some((item) => item.selected === true);
      if (isAnswered === true) {
        return "question selected";
      }
    }
    return "question";
  };
  const handleClickQuestion = (index, question) => {
    setCurrentQuestion(index);
  };
  useEffect(() => {
    if (!dataQuiz || dataQuiz.length === 0) return;

    // reset class toàn bộ
    refClick.current.forEach((ref, i) => {
      if (ref) {
        ref.className = getClassQuestion(i, dataQuiz[i]);
      }
    });

    // gán class "clicked" cho câu hỏi hiện tại
    if (refClick.current[currentQuestion]) {
      refClick.current[currentQuestion].className += " clicked";
    }
  }, [currentQuestion, dataQuiz]);

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} isFinished={isFinished} />
      </div>
      <div className="main-questions">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((question, index) => {
            return (
              <div
                key={`question-${index + 1}`}
                className={getClassQuestion(index, question)}
                onClick={() => handleClickQuestion(index, question)}
                ref={(el) => (refClick.current[index] = el)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
