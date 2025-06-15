import _ from "lodash";
const Question = (props) => {
  const { data, currentQuestion, handleCheckbox } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHandleCheckbox = (e, aId, qId) => {
    handleCheckbox(aId, qId);
  };
  return (
    <>
      {data.image && (
        <div className="q-image text-center">
          <img
            src={`data:image/jpeg;base64,${data.image}`}
            alt=""
            className="text-center"
          />
        </div>
      )}
      <div className="question ">
        <h6>
          Question {currentQuestion + 1}: {data.questionDescription}{" "}
        </h6>
      </div>
      <div className="answers">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((item, index) => {
            return (
              <div key={`answer-${index}`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.selected}
                    onChange={(e) =>
                      handleHandleCheckbox(e, item.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
