import CountDown from "./CountDown";
import { useRef } from "react";
const RightContent = (props) => {
  const { dataQuiz, handleFinishQuiz, setCurrentQuestion } = props;
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
    // Reset class for all first (optional, if you want only one "clicked")
    refClick.current.forEach((ref, i) => {
      if (ref) {
        ref.className = getClassQuestion(i, dataQuiz[i]);
      }
    });

    // Set clicked for current
    if (refClick.current[index]) {
      refClick.current[index].className += " clicked";
    }
  };
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
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
