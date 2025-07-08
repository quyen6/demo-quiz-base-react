import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    let res = await getQuizByUser();

    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <Container>
      <div className="list-quiz-container  mt-3  row justify-content-start pb-5">
        {arrQuiz &&
          arrQuiz.length > 0 &&
          arrQuiz.map((item, index) => {
            return (
              <Col
                key={index}
                xs={{ span: 12 }}
                sm={{ span: 6 }}
                md={{ span: 4 }}
                lg={{ span: 3 }}
              >
                <div
                  className="card "
                  // style={{ width: "18rem" }}
                  key={`list-quiz-${index}`}
                >
                  <div className="card-img">
                    <img
                      src={`data:image/jpeg;base64,${item.image}`}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body ">
                    <h5 className="card-title">
                      {t("user.listquiz.card-title")} {index + 1}
                    </h5>
                    <p className="card-text">{item.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(`/quiz/${item.id}`, {
                          state: { quizTitle: item.description },
                        })
                      }
                    >
                      {t("user.listquiz.btnstart")}
                    </button>
                  </div>
                </div>
              </Col>
            );
          })}

        {arrQuiz && arrQuiz.length === 0 && (
          <div> {t("user.listquiz.noquiz")}</div>
        )}
      </div>
    </Container>
  );
};

export default ListQuiz;
