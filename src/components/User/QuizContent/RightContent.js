import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz, handleFinishQuiz } = props;
  const onTimeUp = () => {
    handleFinishQuiz();
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
              <div key={`question-${index + 1}`} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
