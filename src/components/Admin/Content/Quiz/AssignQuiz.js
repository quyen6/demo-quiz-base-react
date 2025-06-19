import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUser,
} from "../../../../services/apiServices";

const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const fetchUser = async () => {
    let res = await getAllUser();
    console.log("🚀 ~ fetchUser ~ res:", res);
    if (res && res.EC === 0) {
      let users = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username ? item.username : "N/A"} - ${
            item.email
          }`,
        };
      });
      setListUser(users);
    }
  };

  return (
    <div className="assign-quiz-container p-3 pt-0 ">
      <div className="row">
        <div className="select-quiz col-6 mb-3">
          <label className="mb-1">Select Quiz: </label>
          <div className="add-new-question">
            <Select
              options={listQuiz}
              value={selectedQuiz}
              onChange={setSelectedQuiz}
            />
          </div>
        </div>
        <div className="select-quiz col-6 mb-3">
          <label className="mb-1">Select User: </label>
          <div className="add-new-question">
            <Select
              options={listUser}
              value={selectedUser}
              onChange={setSelectedUser}
            />
          </div>
        </div>
      </div>

      <div className="my-3 d-flex justify-content-end">
        <button className="btn btn-primary">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
