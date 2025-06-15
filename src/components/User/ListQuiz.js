import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();

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
    <div className="list-quiz-container container  mt-5">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={`list-quiz-${index}`}
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{item.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${item.id}`, {
                      state: { quizTitle: item.description },
                    })
                  }
                >
                  Start now
                </button>
              </div>
            </div>
          );
        })}

      {arrQuiz && arrQuiz.length === 0 && (
        <div>You dont have any quiz now...</div>
      )}
    </div>
  );
};

export default ListQuiz;
