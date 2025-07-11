import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from "react-i18next";
const Question = (props) => {
  const { t } = useTranslation();
  const { data, currentQuestion, handleCheckbox } = props;

  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHandleCheckbox = (e, aId, qId) => {
    handleCheckbox(aId, qId);
  };
  return (
    <>
      {data.image && (
        <div key={`img`} className="q-image text-center">
          <img
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
            alt=""
            className="text-center"
          />
          {isPreviewImage && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
              onClose={() => setIsPreviewImage(false)}
            />
          )}
        </div>
      )}
      <div className="question ">
        <h6>
          {t("user.detailquiz.question")} {currentQuestion + 1}:{" "}
          {data.questionDescription}{" "}
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
