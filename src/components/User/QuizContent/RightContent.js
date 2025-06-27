const RightContent = (props) => {
  const { dataQuiz } = props;

  return (
    <>
      <div className="main-timer">10:10</div>
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
